import io
import os
import cv2
import re
import pymongo
from google.cloud import vision
from datetime import datetime

# Google hitelesítési kulcs (JSON fájl)
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "raspberry/fridge-key.json"

# MongoDB kapcsolat
"""
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["product_database"]
collection = db["products"]
"""

def capture_image():
    cap = cv2.VideoCapture(0)
    ret, frame = cap.read()
    image_path = "product.jpg"
    cv2.imwrite(image_path, frame)
    cap.release()
    return image_path

def detect_text(image_path):
    client = vision.ImageAnnotatorClient()
    with io.open(image_path, 'rb') as image_file:
        content = image_file.read()
    image = vision.Image(content=content)

    response = client.text_detection(image=image)
    texts = response.text_annotations

    if texts:
        return texts[0].description
    return ""

def extract_expiration_date(text):
    pattern = r"\b(\d{2}/\d{2}/\d{4}|\d{2}-\d{2}-\d{4}|\d{2}\.\d{2}\.\d{4})\b"
    match = re.search(pattern, text)
    return match.group(0) if match else "Nincs dátum"

""""
def save_to_mongodb(product_name, expiration_date):
    data = {
        "product_name": product_name,
        "expiration_date": expiration_date,
        "timestamp": datetime.now()
    }
    collection.insert_one(data)
    print("Adat elmentve MongoDB-be.")
"""
    
def main():
    image_path = capture_image()
    text = detect_text(image_path)
    expiration_date = extract_expiration_date(text)
    #save_to_mongodb(text, expiration_date)
    print(f"Felismert termék: {text}")
    print(f"Lejárati dátum: {expiration_date}")

if __name__ == "__main__":
    main()
