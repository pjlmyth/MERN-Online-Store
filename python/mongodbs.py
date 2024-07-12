from pymongo import MongoClient
import random
from datetime import datetime, timedelta
import json

client = MongoClient('mongodb://localhost:27017/')

db = client['online_store']

users_collection = db['users']
products_collection = db['products']
orders_collection = db['orders']

with open('../mongo/users.json', 'r') as file:
    users = json.load(file)

with open('../mongo/products.json', 'r') as file:
    products = json.load(file)


users_collection.insert_many(users)

products_collection.insert_many(products)

client.close()