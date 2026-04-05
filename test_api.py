import requests
import json

BASE = 'http://127.0.0.1:8000'

print('='*60)
print('FULL SYSTEM TEST REPORT')
print('='*60)

# Test 1: Health check
print('\n1. Health Check')
res = requests.get(f'{BASE}/health')
print(f'   Status: {res.status_code} | Response: {res.json()}')

# Test 2: Valid prediction - Maruti Swift
print('\n2. Prediction: Maruti Swift 2019, 45k km, Manual, Petrol, 1st Owner')
res = requests.post(f'{BASE}/predict', json={
    'brand': 'maruti suzuki', 'model': 'swift', 'year': 2019,
    'kmDriven': 45000, 'transmission': 'Manual', 'fuelType': 'Petrol', 'owner': 'first'
})
print(f'   Status: {res.status_code}')
if res.status_code == 200:
    data = res.json()
    price = data['predicted_price']
    print(f'   Predicted Price: Rs {price:,.2f}')
    print(f'   Model: {data["model_used"]}')

# Test 3: Valid prediction - Hyundai i20
print('\n3. Prediction: Hyundai i20 2020, 30k km, Manual, Petrol, 1st Owner')
res = requests.post(f'{BASE}/predict', json={
    'brand': 'hyundai', 'model': 'i20', 'year': 2020,
    'kmDriven': 30000, 'transmission': 'Manual', 'fuelType': 'Petrol', 'owner': 'first'
})
print(f'   Status: {res.status_code}')
if res.status_code == 200:
    data = res.json()
    print(f'   Predicted Price: Rs {data["predicted_price"]:,.2f}')

# Test 4: Valid prediction - BMW 3 Series
print('\n4. Prediction: BMW 3 Series 2018, 50k km, Auto, Diesel, 2nd Owner')
res = requests.post(f'{BASE}/predict', json={
    'brand': 'bmw', 'model': '3 series', 'year': 2018,
    'kmDriven': 50000, 'transmission': 'Automatic', 'fuelType': 'Diesel', 'owner': 'second'
})
print(f'   Status: {res.status_code}')
if res.status_code == 200:
    data = res.json()
    print(f'   Predicted Price: Rs {data["predicted_price"]:,.2f}')

# Test 5: Valid prediction - Tata Nexon
print('\n5. Prediction: Tata Nexon 2021, 20k km, Manual, Petrol, 1st Owner')
res = requests.post(f'{BASE}/predict', json={
    'brand': 'tata', 'model': 'nexon', 'year': 2021,
    'kmDriven': 20000, 'transmission': 'Manual', 'fuelType': 'Petrol', 'owner': 'first'
})
print(f'   Status: {res.status_code}')
if res.status_code == 200:
    data = res.json()
    print(f'   Predicted Price: Rs {data["predicted_price"]:,.2f}')

# Test 6: Valid prediction - Toyota Innova
print('\n6. Prediction: Toyota Innova 2017, 80k km, Manual, Diesel, 2nd Owner')
res = requests.post(f'{BASE}/predict', json={
    'brand': 'toyota', 'model': 'innova', 'year': 2017,
    'kmDriven': 80000, 'transmission': 'Manual', 'fuelType': 'Diesel', 'owner': 'second'
})
print(f'   Status: {res.status_code}')
if res.status_code == 200:
    data = res.json()
    print(f'   Predicted Price: Rs {data["predicted_price"]:,.2f}')

# Test 7: Valid prediction - Kia Seltos
print('\n7. Prediction: Kia Seltos 2022, 15k km, Auto, Petrol, 1st Owner')
res = requests.post(f'{BASE}/predict', json={
    'brand': 'kia', 'model': 'seltos', 'year': 2022,
    'kmDriven': 15000, 'transmission': 'Automatic', 'fuelType': 'Petrol', 'owner': 'first'
})
print(f'   Status: {res.status_code}')
if res.status_code == 200:
    data = res.json()
    print(f'   Predicted Price: Rs {data["predicted_price"]:,.2f}')

# Test 8: Valid prediction - Mercedes-Benz C-Class
print('\n8. Prediction: Mercedes-Benz C-Class 2019, 35k km, Auto, Petrol, 1st Owner')
res = requests.post(f'{BASE}/predict', json={
    'brand': 'mercedes-benz', 'model': 'c-class', 'year': 2019,
    'kmDriven': 35000, 'transmission': 'Automatic', 'fuelType': 'Petrol', 'owner': 'first'
})
print(f'   Status: {res.status_code}')
if res.status_code == 200:
    data = res.json()
    print(f'   Predicted Price: Rs {data["predicted_price"]:,.2f}')

# ERROR HANDLING TESTS
print('\n' + '='*60)
print('ERROR HANDLING TESTS')
print('='*60)

# Test 9: Missing fields
print('\n9. Error: Missing Fields')
res = requests.post(f'{BASE}/predict', json={'brand': 'maruti suzuki'})
print(f'   Status: {res.status_code} (Expected: 422)')
if res.status_code == 422:
    print(f'   PASS - Pydantic validation caught missing fields')

# Test 10: Invalid year
print('\n10. Error: Invalid Year (1800)')
res = requests.post(f'{BASE}/predict', json={
    'brand': 'maruti suzuki', 'model': 'swift', 'year': 1800,
    'kmDriven': 45000, 'transmission': 'Manual', 'fuelType': 'Petrol', 'owner': 'first'
})
print(f'   Status: {res.status_code} (Expected: 422)')
if res.status_code == 422:
    print(f'   PASS - Year validation working')

# Test 11: Negative km
print('\n11. Error: Negative KM (-5000)')
res = requests.post(f'{BASE}/predict', json={
    'brand': 'maruti suzuki', 'model': 'swift', 'year': 2019,
    'kmDriven': -5000, 'transmission': 'Manual', 'fuelType': 'Petrol', 'owner': 'first'
})
print(f'   Status: {res.status_code} (Expected: 422)')
if res.status_code == 422:
    print(f'   PASS - KM validation working')

# Test 12: Unknown brand
print('\n12. Error: Unknown Brand (unknown_brand_xyz)')
res = requests.post(f'{BASE}/predict', json={
    'brand': 'unknown_brand_xyz', 'model': 'some_model', 'year': 2019,
    'kmDriven': 45000, 'transmission': 'Manual', 'fuelType': 'Petrol', 'owner': 'first'
})
print(f'   Status: {res.status_code} (Expected: 400)')
if res.status_code == 400:
    print(f'   PASS - Unknown brand rejected')
    print(f'   Message: {res.json()["detail"]}')
else:
    print(f'   FAIL - Should return 400, got {res.status_code}')

# Test 13: Invalid model for brand
print('\n13. Error: Invalid Model for Brand (maruti suzuki + iphone)')
res = requests.post(f'{BASE}/predict', json={
    'brand': 'maruti suzuki', 'model': 'iphone', 'year': 2019,
    'kmDriven': 45000, 'transmission': 'Manual', 'fuelType': 'Petrol', 'owner': 'first'
})
print(f'   Status: {res.status_code} (Expected: 400)')
if res.status_code == 400:
    print(f'   PASS - Invalid model rejected')
    print(f'   Message: {res.json()["detail"]}')
else:
    print(f'   FAIL - Should return 400, got {res.status_code}')

# Test 14: Empty body
print('\n14. Error: Empty JSON Body')
res = requests.post(f'{BASE}/predict', json={})
print(f'   Status: {res.status_code} (Expected: 422)')
if res.status_code == 422:
    print(f'   PASS - Empty body rejected')

# REVIEW DATABASE TESTS
print('\n' + '='*60)
print('REVIEW DATABASE TESTS')
print('='*60)

# Test 15: Submit review
print('\n15. Submit Review: Swift 2019, Rating 5')
res = requests.post(f'{BASE}/review', json={
    'brand': 'maruti suzuki', 'model': 'swift', 'year': 2019,
    'km_driven': 45000, 'transmission': 'Manual', 'fuel_type': 'Petrol',
    'owner': 'first', 'predicted_price': 541701.75,
    'rating': 5, 'feedback': 'Very accurate! Matches market value perfectly.'
})
print(f'   Status: {res.status_code}')
print(f'   Response: {res.json()}')

# Test 16: Submit another review
print('\n16. Submit Review: BMW 3 Series 2018, Rating 4')
res = requests.post(f'{BASE}/review', json={
    'brand': 'bmw', 'model': '3 series', 'year': 2018,
    'km_driven': 50000, 'transmission': 'Automatic', 'fuel_type': 'Diesel',
    'owner': 'second', 'predicted_price': 2513213.0,
    'rating': 4, 'feedback': 'Good estimate, slightly higher than expected.'
})
print(f'   Status: {res.status_code}')
print(f'   Response: {res.json()}')

# Test 17: Invalid rating
print('\n17. Error: Invalid Rating (6 stars)')
res = requests.post(f'{BASE}/review', json={
    'brand': 'maruti suzuki', 'model': 'swift', 'year': 2019,
    'km_driven': 45000, 'transmission': 'Manual', 'fuel_type': 'Petrol',
    'owner': 'first', 'predicted_price': 541701.75,
    'rating': 6, 'feedback': 'Invalid rating test'
})
print(f'   Status: {res.status_code} (Expected: 422)')
if res.status_code == 422:
    print(f'   PASS - Invalid rating rejected')

# Test 18: Get review stats
print('\n18. Get Review Stats')
res = requests.get(f'{BASE}/reviews/stats')
print(f'   Status: {res.status_code}')
stats = res.json()
print(f'   Total Reviews: {stats["total_reviews"]}')
print(f'   Average Rating: {stats["average_rating"]}/5')
print(f'   Distribution: {stats["rating_distribution"]}')

# Test 19: Get all reviews
print('\n19. Get All Reviews')
res = requests.get(f'{BASE}/reviews')
reviews = res.json()
print(f'   Total reviews in DB: {len(reviews)}')
if len(reviews) > 0:
    print(f'\n   LATEST REVIEW (Sample):')
    r = reviews[0]
    print(f'   ID: {r["id"]}')
    print(f'   Car: {r["brand"].title()} {r["model"].title()} {r["year"]}')
    print(f'   KM: {r["km_driven"]:,.0f} | Transmission: {r["transmission"].title()}')
    print(f'   Fuel: {r["fuel_type"].title()} | Owner: {r["owner"].title()}')
    print(f'   Predicted Price: Rs {r["predicted_price"]:,.2f}')
    print(f'   Rating: {r["rating"]}/5')
    print(f'   Feedback: "{r["feedback"]}"')
    print(f'   Date: {r["created_at"]}')

print('\n' + '='*60)
print('ALL TESTS COMPLETED')
print('='*60)
