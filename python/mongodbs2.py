from pymongo import MongoClient
from datetime import datetime, timedelta
import json
import pandas as pd
import os

#This is was made if mongodbs.py didn't work and the python script is unable to find your directory
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

client = MongoClient('mongodb://localhost:27017/')

db = client['online_store']

users_collection = db['users']
products_collection = db['products']
orders_collection = db['orders']

users_path = os.path.join(base_dir, 'mongo', 'users.json')
products_path = os.path.join(base_dir, 'mongo', 'products.json')
orders_path = os.path.join(base_dir, 'notebook', 'order_history.csv')

with open(users_path, 'r') as file:
    users = json.load(file)

with open(products_path, 'r') as file:
    products = json.load(file)

users_collection.insert_many(users)

products_collection.insert_many(products)

data = pd.read_csv(orders_path)

data_dict = data.to_dict('records')
orders_collection.insert_many(data_dict)
        
client.close()