import pytest
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


# ============================================================
# INTEGRATION TESTS: API Endpoints
# ============================================================

class TestHealthEndpoint:
    def test_health_returns_200(self):
        response = client.get("/health")
        assert response.status_code == 200
        assert response.json() == {"status": "ok"}

    def test_health_is_get_only(self):
        response = client.post("/health")
        assert response.status_code == 405


class TestRootEndpoint:
    def test_root_returns_200(self):
        response = client.get("/")
        assert response.status_code == 200
        assert "message" in response.json()

    def root_is_get_only(self):
        response = client.post("/")
        assert response.status_code == 405


class TestPredictionEndpoint:
    def test_predict_maruti_swift(self):
        response = client.post("/predict", json={
            "brand": "maruti suzuki", "model": "swift", "year": 2019,
            "kmDriven": 45000, "transmission": "Manual", "fuelType": "Petrol", "owner": "first"
        })
        assert response.status_code == 200
        data = response.json()
        assert "predicted_price" in data
        assert "model_used" in data
        assert data["predicted_price"] > 0
        assert data["model_used"] == "XGBoost + Target Encoding"

    def test_predict_hyundai_i20(self):
        response = client.post("/predict", json={
            "brand": "hyundai", "model": "i20", "year": 2020,
            "kmDriven": 30000, "transmission": "Manual", "fuelType": "Petrol", "owner": "first"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["predicted_price"] > 0

    def test_predict_bmw_3_series(self):
        response = client.post("/predict", json={
            "brand": "bmw", "model": "3 series", "year": 2018,
            "kmDriven": 50000, "transmission": "Automatic", "fuelType": "Diesel", "owner": "second"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["predicted_price"] > 2000000

    def test_predict_tata_nexon(self):
        response = client.post("/predict", json={
            "brand": "tata", "model": "nexon", "year": 2021,
            "kmDriven": 20000, "transmission": "Manual", "fuelType": "Petrol", "owner": "first"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["predicted_price"] > 0

    def test_predict_toyota_innova(self):
        response = client.post("/predict", json={
            "brand": "toyota", "model": "innova", "year": 2017,
            "kmDriven": 80000, "transmission": "Manual", "fuelType": "Diesel", "owner": "second"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["predicted_price"] > 0

    def test_predict_kia_seltos(self):
        response = client.post("/predict", json={
            "brand": "kia", "model": "seltos", "year": 2022,
            "kmDriven": 15000, "transmission": "Automatic", "fuelType": "Petrol", "owner": "first"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["predicted_price"] > 0

    def test_predict_mercedes_c_class(self):
        response = client.post("/predict", json={
            "brand": "mercedes-benz", "model": "c-class", "year": 2019,
            "kmDriven": 35000, "transmission": "Automatic", "fuelType": "Petrol", "owner": "first"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["predicted_price"] > 0

    def test_predict_hybrid_fuel(self):
        response = client.post("/predict", json={
            "brand": "maruti suzuki", "model": "swift", "year": 2020,
            "kmDriven": 25000, "transmission": "Manual", "fuelType": "hybrid", "owner": "first"
        })
        assert response.status_code == 200

    def test_predict_hybrid_cng_fuel(self):
        response = client.post("/predict", json={
            "brand": "maruti suzuki", "model": "swift", "year": 2020,
            "kmDriven": 25000, "transmission": "Manual", "fuelType": "Hybrid/CNG", "owner": "first"
        })
        assert response.status_code == 200

    def test_predict_third_owner(self):
        response = client.post("/predict", json={
            "brand": "maruti suzuki", "model": "swift", "year": 2015,
            "kmDriven": 100000, "transmission": "Manual", "fuelType": "Petrol", "owner": "third"
        })
        assert response.status_code == 200

    def test_predict_unknown_brand_returns_400(self):
        response = client.post("/predict", json={
            "brand": "unknown_brand_xyz", "model": "some_model", "year": 2019,
            "kmDriven": 45000, "transmission": "Manual", "fuelType": "Petrol", "owner": "first"
        })
        assert response.status_code == 400
        assert "not supported" in response.json()["detail"]

    def test_predict_invalid_model_returns_400(self):
        response = client.post("/predict", json={
            "brand": "maruti suzuki", "model": "iphone", "year": 2019,
            "kmDriven": 45000, "transmission": "Manual", "fuelType": "Petrol", "owner": "first"
        })
        assert response.status_code == 400
        assert "not recognized" in response.json()["detail"]

    def test_predict_missing_fields_returns_422(self):
        response = client.post("/predict", json={"brand": "maruti suzuki"})
        assert response.status_code == 422

    def test_predict_invalid_year_returns_422(self):
        response = client.post("/predict", json={
            "brand": "maruti suzuki", "model": "swift", "year": 1800,
            "kmDriven": 45000, "transmission": "Manual", "fuelType": "Petrol", "owner": "first"
        })
        assert response.status_code == 422

    def test_predict_negative_km_returns_422(self):
        response = client.post("/predict", json={
            "brand": "maruti suzuki", "model": "swift", "year": 2019,
            "kmDriven": -5000, "transmission": "Manual", "fuelType": "Petrol", "owner": "first"
        })
        assert response.status_code == 422

    def test_predict_empty_body_returns_422(self):
        response = client.post("/predict", json={})
        assert response.status_code == 422

    def test_predict_invalid_transmission_returns_422(self):
        response = client.post("/predict", json={
            "brand": "maruti suzuki", "model": "swift", "year": 2019,
            "kmDriven": 45000, "transmission": "", "fuelType": "Petrol", "owner": "first"
        })
        assert response.status_code == 422

    def test_predict_invalid_fuel_type_returns_422(self):
        response = client.post("/predict", json={
            "brand": "maruti suzuki", "model": "swift", "year": 2019,
            "kmDriven": 45000, "transmission": "Manual", "fuelType": "", "owner": "first"
        })
        assert response.status_code == 422

    def test_predict_invalid_owner_returns_422(self):
        response = client.post("/predict", json={
            "brand": "maruti suzuki", "model": "swift", "year": 2019,
            "kmDriven": 45000, "transmission": "Manual", "fuelType": "Petrol", "owner": ""
        })
        assert response.status_code == 422

    def test_predict_get_method_returns_405(self):
        response = client.get("/predict")
        assert response.status_code == 405

    def test_predict_price_decreases_with_higher_km(self):
        res_low_km = client.post("/predict", json={
            "brand": "maruti suzuki", "model": "swift", "year": 2019,
            "kmDriven": 10000, "transmission": "Manual", "fuelType": "Petrol", "owner": "first"
        })
        res_high_km = client.post("/predict", json={
            "brand": "maruti suzuki", "model": "swift", "year": 2019,
            "kmDriven": 100000, "transmission": "Manual", "fuelType": "Petrol", "owner": "first"
        })
        assert res_low_km.status_code == 200
        assert res_high_km.status_code == 200
        assert res_low_km.json()["predicted_price"] > res_high_km.json()["predicted_price"]

    def test_predict_price_decreases_with_older_year(self):
        res_new = client.post("/predict", json={
            "brand": "maruti suzuki", "model": "swift", "year": 2022,
            "kmDriven": 20000, "transmission": "Manual", "fuelType": "Petrol", "owner": "first"
        })
        res_old = client.post("/predict", json={
            "brand": "maruti suzuki", "model": "swift", "year": 2015,
            "kmDriven": 20000, "transmission": "Manual", "fuelType": "Petrol", "owner": "first"
        })
        assert res_new.status_code == 200
        assert res_old.status_code == 200
        assert res_new.json()["predicted_price"] > res_old.json()["predicted_price"]

    def test_predict_luxury_vs_economy(self):
        res_economy = client.post("/predict", json={
            "brand": "maruti suzuki", "model": "swift", "year": 2019,
            "kmDriven": 45000, "transmission": "Manual", "fuelType": "Petrol", "owner": "first"
        })
        res_luxury = client.post("/predict", json={
            "brand": "bmw", "model": "3 series", "year": 2019,
            "kmDriven": 45000, "transmission": "Automatic", "fuelType": "Petrol", "owner": "first"
        })
        assert res_economy.status_code == 200
        assert res_luxury.status_code == 200
        assert res_luxury.json()["predicted_price"] > res_economy.json()["predicted_price"]


class TestReviewEndpoint:
    def test_submit_review_success(self):
        response = client.post("/review", json={
            "brand": "maruti suzuki", "model": "swift", "year": 2019,
            "km_driven": 45000, "transmission": "Manual", "fuel_type": "Petrol",
            "owner": "first", "predicted_price": 541701.75,
            "rating": 5, "feedback": "Excellent prediction!"
        })
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        assert data["message"] == "Review submitted successfully"

    def test_submit_review_without_feedback(self):
        response = client.post("/review", json={
            "brand": "hyundai", "model": "i20", "year": 2020,
            "km_driven": 30000, "transmission": "Manual", "fuel_type": "Petrol",
            "owner": "first", "predicted_price": 619632.56,
            "rating": 4, "feedback": ""
        })
        assert response.status_code == 200

    def test_submit_review_rating_1(self):
        response = client.post("/review", json={
            "brand": "maruti suzuki", "model": "swift", "year": 2019,
            "km_driven": 45000, "transmission": "Manual", "fuel_type": "Petrol",
            "owner": "first", "predicted_price": 541701.75,
            "rating": 1, "feedback": "Very inaccurate"
        })
        assert response.status_code == 200

    def test_submit_review_rating_5(self):
        response = client.post("/review", json={
            "brand": "maruti suzuki", "model": "swift", "year": 2019,
            "km_driven": 45000, "transmission": "Manual", "fuel_type": "Petrol",
            "owner": "first", "predicted_price": 541701.75,
            "rating": 5, "feedback": "Perfect!"
        })
        assert response.status_code == 200

    def test_submit_review_invalid_rating_zero(self):
        response = client.post("/review", json={
            "brand": "maruti suzuki", "model": "swift", "year": 2019,
            "km_driven": 45000, "transmission": "Manual", "fuel_type": "Petrol",
            "owner": "first", "predicted_price": 541701.75,
            "rating": 0, "feedback": "Invalid"
        })
        assert response.status_code == 422

    def test_submit_review_invalid_rating_six(self):
        response = client.post("/review", json={
            "brand": "maruti suzuki", "model": "swift", "year": 2019,
            "km_driven": 45000, "transmission": "Manual", "fuel_type": "Petrol",
            "owner": "first", "predicted_price": 541701.75,
            "rating": 6, "feedback": "Invalid"
        })
        assert response.status_code == 422

    def test_submit_review_missing_fields(self):
        response = client.post("/review", json={"rating": 5})
        assert response.status_code == 422

    def test_submit_review_empty_body(self):
        response = client.post("/review", json={})
        assert response.status_code == 422

    def test_submit_review_get_method_returns_405(self):
        response = client.get("/review")
        assert response.status_code == 405


class TestReviewStatsEndpoint:
    def test_get_stats_returns_200(self):
        response = client.get("/reviews/stats")
        assert response.status_code == 200

    def test_get_stats_structure(self):
        response = client.get("/reviews/stats")
        data = response.json()
        assert "total_reviews" in data
        assert "average_rating" in data
        assert "rating_distribution" in data

    def test_get_stats_after_submission(self):
        client.post("/review", json={
            "brand": "maruti suzuki", "model": "swift", "year": 2019,
            "km_driven": 45000, "transmission": "Manual", "fuel_type": "Petrol",
            "owner": "first", "predicted_price": 541701.75,
            "rating": 5, "feedback": "Test review"
        })
        response = client.get("/reviews/stats")
        assert response.status_code == 200
        data = response.json()
        assert data["total_reviews"] > 0
        assert data["average_rating"] > 0


class TestReviewsListEndpoint:
    def test_get_reviews_returns_200(self):
        response = client.get("/reviews")
        assert response.status_code == 200

    def test_get_reviews_returns_list(self):
        response = client.get("/reviews")
        data = response.json()
        assert isinstance(data, list)

    def test_get_reviews_with_limit(self):
        response = client.get("/reviews?limit=5")
        assert response.status_code == 200
        data = response.json()
        assert len(data) <= 5

    def test_get_reviews_with_offset(self):
        response = client.get("/reviews?offset=100")
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 0


class TestEndToEnd:
    def test_full_prediction_to_review_flow(self):
        # Step 1: Get prediction
        pred_response = client.post("/predict", json={
            "brand": "tata", "model": "nexon", "year": 2021,
            "kmDriven": 20000, "transmission": "Manual", "fuelType": "Petrol", "owner": "first"
        })
        assert pred_response.status_code == 200
        price = pred_response.json()["predicted_price"]

        # Step 2: Submit review for that prediction
        review_response = client.post("/review", json={
            "brand": "tata", "model": "nexon", "year": 2021,
            "km_driven": 20000, "transmission": "Manual", "fuel_type": "Petrol",
            "owner": "first", "predicted_price": price,
            "rating": 4, "feedback": "Good estimate for Nexon"
        })
        assert review_response.status_code == 200

        # Step 3: Verify review appears in stats
        stats_response = client.get("/reviews/stats")
        assert stats_response.status_code == 200
        assert stats_response.json()["total_reviews"] > 0

    def test_multiple_brands_prediction_consistency(self):
        brands_to_test = [
            ("maruti suzuki", "swift", 2019),
            ("hyundai", "i20", 2020),
            ("tata", "nexon", 2021),
            ("toyota", "innova", 2017),
            ("kia", "seltos", 2022),
        ]
        for brand, model, year in brands_to_test:
            response = client.post("/predict", json={
                "brand": brand, "model": model, "year": year,
                "kmDriven": 40000, "transmission": "Manual", "fuelType": "Petrol", "owner": "first"
            })
            assert response.status_code == 200, f"Failed for {brand} {model}"
            assert response.json()["predicted_price"] > 0
