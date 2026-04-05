import sqlite3
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

DB_PATH = os.path.join(os.path.dirname(__file__), "backend", "reviews.db")

conn = sqlite3.connect(DB_PATH)
conn.row_factory = sqlite3.Row
cursor = conn.cursor()

cursor.execute("SELECT * FROM reviews ORDER BY created_at DESC")
reviews = cursor.fetchall()

print("=" * 80)
print(f"TOTAL REVIEWS: {len(reviews)}")
print("=" * 80)

for i, r in enumerate(reviews, 1):
    print(f"\n{'-' * 80}")
    print(f"  Review #{r['id']}")
    print(f"  Car:         {r['brand'].title()} {r['model'].title()} {r['year']}")
    print(f"  KM Driven:   {r['km_driven']:,.0f} km")
    print(f"  Transmission:{r['transmission'].title()}")
    print(f"  Fuel Type:   {r['fuel_type'].title()}")
    print(f"  Owner:       {r['owner'].title()}")
    print(f"  Price:       Rs {r['predicted_price']:,.2f}")
    stars = "*" * r['rating'] + "." * (5 - r['rating'])
    print(f"  Rating:      {stars} ({r['rating']}/5)")
    print(f"  Feedback:    \"{r['feedback']}\"")
    print(f"  Date:        {r['created_at']}")

print(f"\n{'=' * 80}")

# Stats
cursor.execute("SELECT COUNT(*) as total, AVG(rating) as avg_rating FROM reviews")
stats = cursor.fetchone()
print(f"Total Reviews: {stats['total']}")
print(f"Average Rating: {stats['avg_rating']:.1f}/5")

cursor.execute("SELECT rating, COUNT(*) as count FROM reviews GROUP BY rating ORDER BY rating")
print("\nRating Distribution:")
for row in cursor.fetchall():
    bar = "#" * row['count']
    print(f"  {row['rating']} star: {bar} ({row['count']})")

conn.close()
