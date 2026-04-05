import sqlite3
import os
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), "reviews.db")


def init_db():
    """Initialize the database and create tables if they don't exist."""
    conn = sqlite3.connect(DB_PATH)
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

    # Create indexes for common queries
    cursor.execute("""
        CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating)
    """)
    cursor.execute("""
        CREATE INDEX IF NOT EXISTS idx_reviews_brand ON reviews(brand)
    """)
    cursor.execute("""
        CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at)
    """)

    conn.commit()
    conn.close()


def insert_review(review_data: dict) -> int:
    """Insert a new review into the database and return the review ID."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO reviews (
            brand, model, year, km_driven, transmission,
            fuel_type, owner, predicted_price, rating, feedback
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        review_data["brand"],
        review_data["model"],
        review_data["year"],
        review_data["km_driven"],
        review_data["transmission"],
        review_data["fuel_type"],
        review_data["owner"],
        review_data["predicted_price"],
        review_data["rating"],
        review_data.get("feedback", ""),
    ))

    review_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return review_id if review_id is not None else 0


def get_all_reviews(limit: int = 100, offset: int = 0) -> list:
    """Get all reviews with pagination."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("""
        SELECT * FROM reviews
        ORDER BY created_at DESC
        LIMIT ? OFFSET ?
    """, (limit, offset))

    reviews = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return reviews


def get_review_stats() -> dict:
    """Get review statistics."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) as total FROM reviews")
    total = cursor.fetchone()[0]

    cursor.execute("SELECT AVG(rating) as avg_rating FROM reviews")
    avg_rating_row = cursor.fetchone()
    avg_rating = round(avg_rating_row[0], 2) if avg_rating_row[0] else 0

    cursor.execute("""
        SELECT rating, COUNT(*) as count
        FROM reviews
        GROUP BY rating
        ORDER BY rating
    """)
    rating_distribution = {row[0]: row[1] for row in cursor.fetchall()}

    conn.close()

    return {
        "total_reviews": total,
        "average_rating": avg_rating,
        "rating_distribution": rating_distribution,
    }


# Initialize DB on module import
init_db()
