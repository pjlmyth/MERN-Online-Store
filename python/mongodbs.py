from pymongo import MongoClient
from datetime import datetime, timedelta
import json
import pandas as pd

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

data = pd.read_csv('../notebook/order_history.csv')

data_dict = data.to_dict('records')
orders_collection.insert_many(data_dict)
        
client.close()