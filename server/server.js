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
const PORT = process.env.PORT || 3000;

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

app.get('/products/:category', async (req, res) => {
    try {
        const { category } = req.params;
        console.log(`Finding ${category}`)
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const query = {
            $or: [
                { category: { $regex: category, $options: 'i' } },
                { gender: { $regex: category, $options: 'i' } }
            ]
        };
        const collection = db.collection('products');
        const products  = await collection.find(query).toArray();
        console.log(products)
        res.json(products);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Missing Products ☹");
    }
});

app.post('/products/search', async (req, res) => {
    try {
        const { searchTerm } = req.body;

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('products');

        const query = {
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } },
                { category: { $regex: searchTerm, $options: 'i' } },
                { gender: { $regex: searchTerm, $options: 'i' } }
            ]
        };

        const products = await collection.find(query).toArray();
        res.json(products);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error searching products');
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

app.get('/products/:page/:limit', async (req, res) => {
    try {
        let { page, limit } = req.params;
        limit = +limit; 
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('products');
        const socks = await collection.find({}).skip((page - 1) * limit).limit(limit).toArray();
        res.json(socks);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Missing Products ☹');
    }
});

app.post('/register', async (req, res) => {
    try {
        const {userid, name, email, password, firstName, lastName, gender, birthday} = req.body;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('users');

        // Check if user with this email or userid already exists
        const existingUser = await collection.findOne({ $or: [{ email }, { userid }] });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email or userid already exists" });
        }
    
        const newUser = {
            userid: userid,
            username: name,
            email,
            password,
            firstName,
            lastName,
            gender,
            birthday: new Date(birthday)
        };

        const result = await collection.insertOne(newUser);
        
        res.status(201).json({ message: "User registered successfully", userId: result.insertedId });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "Error registering user" });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('users');
        const user = await collection.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid password" });
        }

        res.status(200).json({ 
            message: "Login successful", 
            userid: user.userid,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "Error during login" });
    } 
});

app.get('/profile/:userid', async (req, res) => {
    try {
        const { userid } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('users');
        const user = await collection.findOne({ userid: userid });  // Note: userid is a string
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { password, ...userInfo } = user;
        res.json(userInfo);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "Error fetching user profile" });
    } 
});

app.get('/user_orders/:username', async (req, res) => {
    try {
        console.log("Finding history")
        const { username } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('orders');
        console.log(username)
        const ordersIds = await collection.find({ user_name: username }).toArray();
        const productsIds = ordersIds.map(ordersIds => ordersIds.product_id);
        console.log(username)
        const products = db.collection(`products`);
        const product = await products.find({ 'productID': { $in: productsIds.map(id => parseInt(id)) } }).toArray();
        res.json(product)
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "Error fetching user orders" });
    } 
});

app.post('/place-order', async (req, res) => {
    try {
        const { user_id, user_name, product_id, product_name, product_category } = req.body;

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('orders');

        const newOrder = {
            order_date: new Date().toISOString(),
            user_id: user_id,
            product_id: product_id,
            product_name: product_name,
            product_category: product_category,
            user_name: user_name
        };

        const result = await collection.insertOne(newOrder);

        if (result.acknowledged) {
            res.status(201).json({ message: "Order placed successfully", orderId: result.insertedId });
        } else {
            throw new Error('Failed to insert order');
        }
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "Error placing order", error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});