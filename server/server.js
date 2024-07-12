import express from 'express';
import { promises as fs } from 'fs';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;

const app = express();
app.use(cors());
const PORT = 3000;

app.use(express.json());

app.get('/products', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('products');
        const products  = await collection.find({}).toArray();
        res.json(products);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Missing Products ☹");
    }
});

//Note: add if else for different search entries like categories
app.post('/product/search', async (req, res) => {
    try {
        const prodname = req.body.searchTerm;

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('products');
        const products = await collection.find({"name": prodname}).toArray();
        res.json(products);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('"Missing Products ☹"');
    }
});

app.get('/users', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('users');
        const products  = await collection.find({}).toArray();
        res.json(products);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Missing Products ☹");
    }
});

app.get('/orders', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('orders');
        const products  = await collection.find({}).toArray();
        res.json(products);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Missing Products ☹");
    }
});

//Note: mot fully operational
app.get('/user_orders', async (req, res) => {
    try {
        const userid = req.session.userid;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('orders');
        const products  = await collection.find({'userid': userid}).toArray();
        res.json(products);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Missing Products ☹");
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});