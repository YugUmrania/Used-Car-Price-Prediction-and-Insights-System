import pytest
import numpy as np
import pandas as pd
import os
import sqlite3
import sys
import importlib

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))

from preprocess import preprocess_input, VALID_BRANDS, VALID_MODELS, LUXURY_BRANDS
from database import init_db, insert_review, get_all_reviews, get_review_stats
from schema import CarInput, PredictionOutput, ReviewInput, ReviewOutput, ReviewStats


# ============================================================
# UNIT TESTS: preprocess.py
# ============================================================

class TestPreprocessValidBrands:
    def test_valid_brands_count(self):
        assert len(VALID_BRANDS) == 43

    def test_maruti_suzuki_in_brands(self):
        assert "maruti suzuki" in VALID_BRANDS

    def test_hyundai_in_brands(self):
        assert "hyundai" in VALID_BRANDS

    def test_bmw_in_brands(self):
        assert "bmw" in VALID_BRANDS

    def test_unknown_brand_not_in_list(self):
        assert "unknown_brand_xyz" not in VALID_BRANDS

    def test_all_brands_lowercase(self):
        for brand in VALID_BRANDS:
            assert brand == brand.lower(), f"Brand '{brand}' is not lowercase"


class TestPreprocessValidModels:
    def test_maruti_models_exist(self):
        assert "maruti suzuki" in VALID_MODELS
        assert "swift" in VALID_MODELS["maruti suzuki"]
        assert "baleno" in VALID_MODELS["maruti suzuki"]

    def test_hyundai_models_exist(self):
        assert "hyundai" in VALID_MODELS
        assert "i20" in VALID_MODELS["hyundai"]
        assert "creta" in VALID_MODELS["hyundai"]

    def test_bmw_models_exist(self):
        assert "bmw" in VALID_MODELS
        assert "3 series" in VALID_MODELS["bmw"]
        assert "x1" in VALID_MODELS["bmw"]

    def test_tata_models_exist(self):
        assert "tata" in VALID_MODELS
        assert "nexon" in VALID_MODELS["tata"]
        assert "harrier" in VALID_MODELS["tata"]

    def test_toyota_models_exist(self):
        assert "toyota" in VALID_MODELS
        assert "innova" in VALID_MODELS["toyota"]
        assert "fortuner" in VALID_MODELS["toyota"]

    def test_kia_models_exist(self):
        assert "kia" in VALID_MODELS
        assert "seltos" in VALID_MODELS["kia"]
        assert "sonet" in VALID_MODELS["kia"]

    def test_mercedes_models_exist(self):
        assert "mercedes-benz" in VALID_MODELS
        assert "c-class" in VALID_MODELS["mercedes-benz"]
        assert "e-class" in VALID_MODELS["mercedes-benz"]

    def test_invalid_model_not_in_any_brand(self):
        for brand, models in VALID_MODELS.items():
            assert "iphone" not in models, f"'iphone' found in {brand}"
            assert "random_fake" not in models


class TestPreprocessDerivedFeatures:
    def test_car_age_calculation(self, mocker):
        mock_encoder = mocker.MagicMock()
        mock_encoder.transform.return_value = pd.DataFrame()

        data = {
            "brand": "maruti suzuki", "model": "swift",
            "year": 2020, "kmDriven": 30000,
            "transmission": "Manual", "fuelType": "Petrol", "owner": "first"
        }
        preprocess_input(data, mock_encoder)

        call_args = mock_encoder.transform.call_args[0][0]
        expected_age = 2026 - 2020
        assert call_args.iloc[0]["age"] == expected_age

    def test_log_km_calculation(self, mocker):
        mock_encoder = mocker.MagicMock()
        mock_encoder.transform.return_value = pd.DataFrame()

        data = {
            "brand": "maruti suzuki", "model": "swift",
            "year": 2020, "kmDriven": 30000,
            "transmission": "Manual", "fuelType": "Petrol", "owner": "first"
        }
        preprocess_input(data, mock_encoder)

        call_args = mock_encoder.transform.call_args[0][0]
        expected_log_km = np.log1p(30000)
        assert abs(call_args.iloc[0]["kmdriven"] - expected_log_km) < 0.001
        assert abs(call_args.iloc[0]["log_km"] - expected_log_km) < 0.001

    def test_km_per_year_calculation(self, mocker):
        mock_encoder = mocker.MagicMock()
        mock_encoder.transform.return_value = pd.DataFrame()

        data = {
            "brand": "maruti suzuki", "model": "swift",
            "year": 2020, "kmDriven": 30000,
            "transmission": "Manual", "fuelType": "Petrol", "owner": "first"
        }
        preprocess_input(data, mock_encoder)

        call_args = mock_encoder.transform.call_args[0][0]
        age = 2026 - 2020
        log_km = np.log1p(30000)
        expected_km_per_year = log_km / (age + 1)
        assert abs(call_args.iloc[0]["km_per_year"] - expected_km_per_year) < 0.001

    def test_age_squared_calculation(self, mocker):
        mock_encoder = mocker.MagicMock()
        mock_encoder.transform.return_value = pd.DataFrame()

        data = {
            "brand": "maruti suzuki", "model": "swift",
            "year": 2020, "kmDriven": 30000,
            "transmission": "Manual", "fuelType": "Petrol", "owner": "first"
        }
        preprocess_input(data, mock_encoder)

        call_args = mock_encoder.transform.call_args[0][0]
        age = 2026 - 2020
        assert call_args.iloc[0]["age_squared"] == age ** 2

    def test_manual_transmission_encoding(self, mocker):
        mock_encoder = mocker.MagicMock()
        mock_encoder.transform.return_value = pd.DataFrame()

        data = {
            "brand": "maruti suzuki", "model": "swift",
            "year": 2020, "kmDriven": 30000,
            "transmission": "Manual", "fuelType": "Petrol", "owner": "first"
        }
        preprocess_input(data, mock_encoder)

        call_args = mock_encoder.transform.call_args[0][0]
        assert call_args.iloc[0]["transmission_manual"] == 1
        assert call_args.iloc[0]["transmission_automatic"] == 0

    def test_automatic_transmission_encoding(self, mocker):
        mock_encoder = mocker.MagicMock()
        mock_encoder.transform.return_value = pd.DataFrame()

        data = {
            "brand": "maruti suzuki", "model": "swift",
            "year": 2020, "kmDriven": 30000,
            "transmission": "Automatic", "fuelType": "Petrol", "owner": "first"
        }
        preprocess_input(data, mock_encoder)

        call_args = mock_encoder.transform.call_args[0][0]
        assert call_args.iloc[0]["transmission_automatic"] == 1
        assert call_args.iloc[0]["transmission_manual"] == 0

    def test_petrol_fuel_encoding(self, mocker):
        mock_encoder = mocker.MagicMock()
        mock_encoder.transform.return_value = pd.DataFrame()

        data = {
            "brand": "maruti suzuki", "model": "swift",
            "year": 2020, "kmDriven": 30000,
            "transmission": "Manual", "fuelType": "Petrol", "owner": "first"
        }
        preprocess_input(data, mock_encoder)

        call_args = mock_encoder.transform.call_args[0][0]
        assert call_args.iloc[0]["fueltype_petrol"] == 1
        assert call_args.iloc[0]["fueltype_diesel"] == 0
        assert call_args.iloc[0]["fueltype_hybrid"] == 0
        assert call_args.iloc[0]["fueltype_hybrid/cng"] == 0

    def test_diesel_fuel_encoding(self, mocker):
        mock_encoder = mocker.MagicMock()
        mock_encoder.transform.return_value = pd.DataFrame()

        data = {
            "brand": "maruti suzuki", "model": "swift",
            "year": 2020, "kmDriven": 30000,
            "transmission": "Manual", "fuelType": "Diesel", "owner": "first"
        }
        preprocess_input(data, mock_encoder)

        call_args = mock_encoder.transform.call_args[0][0]
        assert call_args.iloc[0]["fueltype_diesel"] == 1
        assert call_args.iloc[0]["fueltype_petrol"] == 0

    def test_first_owner_encoding(self, mocker):
        mock_encoder = mocker.MagicMock()
        mock_encoder.transform.return_value = pd.DataFrame()

        data = {
            "brand": "maruti suzuki", "model": "swift",
            "year": 2020, "kmDriven": 30000,
            "transmission": "Manual", "fuelType": "Petrol", "owner": "first"
        }
        preprocess_input(data, mock_encoder)

        call_args = mock_encoder.transform.call_args[0][0]
        assert call_args.iloc[0]["owner_first"] == 1
        assert call_args.iloc[0]["owner_second"] == 0
        assert call_args.iloc[0]["owner_third"] == 0

    def test_second_owner_encoding(self, mocker):
        mock_encoder = mocker.MagicMock()
        mock_encoder.transform.return_value = pd.DataFrame()

        data = {
            "brand": "maruti suzuki", "model": "swift",
            "year": 2020, "kmDriven": 30000,
            "transmission": "Manual", "fuelType": "Petrol", "owner": "second"
        }
        preprocess_input(data, mock_encoder)

        call_args = mock_encoder.transform.call_args[0][0]
        assert call_args.iloc[0]["owner_second"] == 1
        assert call_args.iloc[0]["owner_first"] == 0

    def test_third_owner_encoding(self, mocker):
        mock_encoder = mocker.MagicMock()
        mock_encoder.transform.return_value = pd.DataFrame()

        data = {
            "brand": "maruti suzuki", "model": "swift",
            "year": 2020, "kmDriven": 30000,
            "transmission": "Manual", "fuelType": "Petrol", "owner": "third"
        }
        preprocess_input(data, mock_encoder)

        call_args = mock_encoder.transform.call_args[0][0]
        assert call_args.iloc[0]["owner_third"] == 1
        assert call_args.iloc[0]["owner_first"] == 0

    def test_output_is_dataframe(self, mocker):
        mock_encoder = mocker.MagicMock()
        mock_encoder.transform.return_value = pd.DataFrame()

        data = {
            "brand": "maruti suzuki", "model": "swift",
            "year": 2020, "kmDriven": 30000,
            "transmission": "Manual", "fuelType": "Petrol", "owner": "first"
        }
        result = preprocess_input(data, mock_encoder)
        assert isinstance(result, pd.DataFrame)

    def test_case_insensitive_brand(self, mocker):
        mock_encoder = mocker.MagicMock()
        mock_encoder.transform.return_value = pd.DataFrame()

        data = {
            "brand": "MARUTI SUZUKI", "model": "SWIFT",
            "year": 2020, "kmDriven": 30000,
            "transmission": "MANUAL", "fuelType": "PETROL", "owner": "FIRST"
        }
        preprocess_input(data, mock_encoder)

        call_args = mock_encoder.transform.call_args[0][0]
        assert call_args.iloc[0]["brand"] == "maruti suzuki"
        assert call_args.iloc[0]["model"] == "swift"

    def test_whitespace_stripping(self, mocker):
        mock_encoder = mocker.MagicMock()
        mock_encoder.transform.return_value = pd.DataFrame()

        data = {
            "brand": "  maruti suzuki  ", "model": "  swift  ",
            "year": 2020, "kmDriven": 30000,
            "transmission": "  Manual  ", "fuelType": "  Petrol  ", "owner": "  first  "
        }
        preprocess_input(data, mock_encoder)

        call_args = mock_encoder.transform.call_args[0][0]
        assert call_args.iloc[0]["brand"] == "maruti suzuki"
        assert call_args.iloc[0]["model"] == "swift"


class TestLuxuryBrands:
    def test_luxury_brands_list(self):
        assert "bmw" in LUXURY_BRANDS
        assert "mercedes-benz" in LUXURY_BRANDS
        assert "audi" in LUXURY_BRANDS
        assert "porsche" in LUXURY_BRANDS

    def test_non_luxury_not_in_list(self):
        assert "maruti suzuki" not in LUXURY_BRANDS
        assert "hyundai" not in LUXURY_BRANDS
        assert "tata" not in LUXURY_BRANDS


# ============================================================
# UNIT TESTS: database.py
# ============================================================

class TestDatabaseOperations:
    @pytest.fixture(autouse=True)
    def setup_test_db(self, tmp_path):
        """Use a temporary database for each test."""
        import database
        test_db = str(tmp_path / "test_reviews.db")
        original_db = database.DB_PATH
        database.DB_PATH = test_db

        # Reinitialize with temp DB
        conn = sqlite3.connect(test_db)
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS reviews (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                brand TEXT NOT NULL,
                model TEXT NOT NULL,
                year INTEGER NOT NULL,
                km_driven REAL NOT NULL,
                transmission TEXT NOT NULL,
                fuel_type TEXT NOT NULL,
                owner TEXT NOT NULL,
                predicted_price REAL NOT NULL,
                rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
                feedback TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating)")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_reviews_brand ON reviews(brand)")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at)")
        conn.commit()
        conn.close()

        yield test_db

        database.DB_PATH = original_db

    def test_insert_review_returns_id(self):
        review_data = {
            "brand": "maruti suzuki", "model": "swift", "year": 2019,
            "km_driven": 45000, "transmission": "Manual", "fuel_type": "Petrol",
            "owner": "first", "predicted_price": 541701.75,
            "rating": 5, "feedback": "Great prediction!"
        }
        review_id = insert_review(review_data)
        assert review_id == 1

    def test_insert_review_stores_data(self):
        import database
        review_data = {
            "brand": "hyundai", "model": "i20", "year": 2020,
            "km_driven": 30000, "transmission": "Manual", "fuel_type": "Petrol",
            "owner": "first", "predicted_price": 619632.56,
            "rating": 4, "feedback": "Good estimate"
        }
        insert_review(review_data)

        conn = sqlite3.connect(database.DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM reviews WHERE id = 1")
        row = dict(cursor.fetchone())
        conn.close()

        assert row["brand"] == "hyundai"
        assert row["model"] == "i20"
        assert row["year"] == 2020
        assert row["km_driven"] == 30000
        assert row["transmission"] == "Manual"
        assert row["fuel_type"] == "Petrol"
        assert row["owner"] == "first"
        assert row["predicted_price"] == 619632.56
        assert row["rating"] == 4
        assert row["feedback"] == "Good estimate"

    def test_insert_multiple_reviews(self):
        for i in range(5):
            insert_review({
                "brand": "maruti suzuki", "model": "swift", "year": 2019,
                "km_driven": 45000, "transmission": "Manual", "fuel_type": "Petrol",
                "owner": "first", "predicted_price": 541701.75,
                "rating": i + 1, "feedback": f"Review {i+1}"
            })

        reviews = get_all_reviews()
        assert len(reviews) == 5

    def test_get_all_reviews_empty(self):
        reviews = get_all_reviews()
        assert len(reviews) == 0

    def test_get_all_reviews_ordered_by_date(self):
        import time
        insert_review({
            "brand": "maruti suzuki", "model": "swift", "year": 2019,
            "km_driven": 45000, "transmission": "Manual", "fuel_type": "Petrol",
            "owner": "first", "predicted_price": 541701.75,
            "rating": 5, "feedback": "First"
        })
        time.sleep(0.1)
        insert_review({
            "brand": "hyundai", "model": "i20", "year": 2020,
            "km_driven": 30000, "transmission": "Manual", "fuel_type": "Petrol",
            "owner": "first", "predicted_price": 619632.56,
            "rating": 4, "feedback": "Second"
        })

        reviews = get_all_reviews()
        assert reviews[0]["feedback"] == "Second"
        assert reviews[1]["feedback"] == "First"

    def test_get_review_stats_empty_db(self):
        stats = get_review_stats()
        assert stats["total_reviews"] == 0
        assert stats["average_rating"] == 0
        assert stats["rating_distribution"] == {}

    def test_get_review_stats_with_data(self):
        insert_review({
            "brand": "maruti suzuki", "model": "swift", "year": 2019,
            "km_driven": 45000, "transmission": "Manual", "fuel_type": "Petrol",
            "owner": "first", "predicted_price": 541701.75,
            "rating": 5, "feedback": "Excellent"
        })
        insert_review({
            "brand": "hyundai", "model": "i20", "year": 2020,
            "km_driven": 30000, "transmission": "Manual", "fuel_type": "Petrol",
            "owner": "first", "predicted_price": 619632.56,
            "rating": 3, "feedback": "Average"
        })

        stats = get_review_stats()
        assert stats["total_reviews"] == 2
        assert stats["average_rating"] == 4.0
        assert stats["rating_distribution"] == {3: 1, 5: 1}

    def test_review_with_empty_feedback(self):
        review_data = {
            "brand": "maruti suzuki", "model": "swift", "year": 2019,
            "km_driven": 45000, "transmission": "Manual", "fuel_type": "Petrol",
            "owner": "first", "predicted_price": 541701.75,
            "rating": 5, "feedback": ""
        }
        review_id = insert_review(review_data)
        assert review_id == 1

        reviews = get_all_reviews()
        assert reviews[0]["feedback"] == ""

    def test_review_with_long_feedback(self):
        long_feedback = "A" * 1000
        review_data = {
            "brand": "maruti suzuki", "model": "swift", "year": 2019,
            "km_driven": 45000, "transmission": "Manual", "fuel_type": "Petrol",
            "owner": "first", "predicted_price": 541701.75,
            "rating": 5, "feedback": long_feedback
        }
        review_id = insert_review(review_data)
        assert review_id == 1

        reviews = get_all_reviews()
        assert len(reviews[0]["feedback"]) == 1000

    def test_review_timestamp_exists(self):
        review_data = {
            "brand": "maruti suzuki", "model": "swift", "year": 2019,
            "km_driven": 45000, "transmission": "Manual", "fuel_type": "Petrol",
            "owner": "first", "predicted_price": 541701.75,
            "rating": 5, "feedback": "Test"
        }
        insert_review(review_data)

        reviews = get_all_reviews()
        assert reviews[0]["created_at"] is not None
        assert len(reviews[0]["created_at"]) > 0


# ============================================================
# UNIT TESTS: schema.py
# ============================================================

class TestSchemaValidation:
    def test_valid_car_input(self):
        car = CarInput(
            brand="maruti suzuki", model="swift", year=2019,
            kmDriven=45000, transmission="Manual", fuelType="Petrol", owner="first"
        )
        assert car.brand == "maruti suzuki"
        assert car.model == "swift"
        assert car.year == 2019
        assert car.kmDriven == 45000

    def test_car_input_missing_field(self):
        with pytest.raises(Exception):
            CarInput(brand="maruti suzuki")

    def test_car_input_invalid_year_too_old(self):
        with pytest.raises(Exception):
            CarInput(
                brand="maruti suzuki", model="swift", year=1800,
                kmDriven=45000, transmission="Manual", fuelType="Petrol", owner="first"
            )

    def test_car_input_invalid_km_negative(self):
        with pytest.raises(Exception):
            CarInput(
                brand="maruti suzuki", model="swift", year=2019,
                kmDriven=-5000, transmission="Manual", fuelType="Petrol", owner="first"
            )

    def test_prediction_output(self):
        output = PredictionOutput(predicted_price=541701.75, model_used="XGBoost + Target Encoding")
        assert output.predicted_price == 541701.75
        assert output.model_used == "XGBoost + Target Encoding"

    def test_valid_review_input(self):
        review = ReviewInput(
            brand="maruti suzuki", model="swift", year=2019,
            km_driven=45000, transmission="Manual", fuel_type="Petrol",
            owner="first", predicted_price=541701.75,
            rating=5, feedback="Great!"
        )
        assert review.rating == 5
        assert review.feedback == "Great!"

    def test_review_input_empty_feedback(self):
        review = ReviewInput(
            brand="maruti suzuki", model="swift", year=2019,
            km_driven=45000, transmission="Manual", fuel_type="Petrol",
            owner="first", predicted_price=541701.75,
            rating=5, feedback=""
        )
        assert review.feedback == ""

    def test_review_input_invalid_rating_zero(self):
        with pytest.raises(Exception):
            ReviewInput(
                brand="maruti suzuki", model="swift", year=2019,
                km_driven=45000, transmission="Manual", fuel_type="Petrol",
                owner="first", predicted_price=541701.75,
                rating=0, feedback=""
            )

    def test_review_input_invalid_rating_six(self):
        with pytest.raises(Exception):
            ReviewInput(
                brand="maruti suzuki", model="swift", year=2019,
                km_driven=45000, transmission="Manual", fuel_type="Petrol",
                owner="first", predicted_price=541701.75,
                rating=6, feedback=""
            )

    def test_review_output(self):
        output = ReviewOutput(id=1, message="Review submitted successfully")
        assert output.id == 1
        assert output.message == "Review submitted successfully"

    def test_review_stats(self):
        stats = ReviewStats(
            total_reviews=10,
            average_rating=4.5,
            rating_distribution={4: 5, 5: 5}
        )
        assert stats.total_reviews == 10
        assert stats.average_rating == 4.5
        assert stats.rating_distribution == {4: 5, 5: 5}
