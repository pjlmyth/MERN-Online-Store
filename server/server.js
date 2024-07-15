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
        const collection = db.collection('products');
        const products  = await collection.find({'category': category}).toArray();
        console.log(products)
        res.json(products);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Missing Products ☹");
    }
});

app.get('/products/:gender', async (req, res) => {
    try {
        const { gender } = req.params;
        console.log(`Finding ${gender}`)
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('products');
        const products  = await collection.find({'gender': gender}).toArray();
        res.json(products);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Missing Products ☹");
    }
});

// app.post('/product/search', async (req, res) => {
//     try {
//         const searchTerm = req.body.searchTerm.toLowerCase(); // Normalize search term to lowercase

//         const client = await MongoClient.connect(url);
//         const db = client.db(dbName);
//         const collection = db.collection('products');

//         let query = {};

//         // Check if searchTerm contains a space, suggesting it's a category
//         if (searchTerm.includes(' ')) {
//             query = { "category": { $regex: searchTerm, $options: 'i' } }; // Case-insensitive search by category
//         } else {
//             query = { "name": { $regex: searchTerm, $options: 'i' } }; // Case-insensitive search by name
//         }

//         const products = await collection.find(query).toArray();

//         res.json(products);
//     } catch (err) {
//         console.error('Error:', err);
//         res.status(500).send('"Missing Products ☹"');
//     }
// });

app.post('/products/search', async (req, res) => {
    try {
        const { searchTerm } = req.body;

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('products');

        const query = {
            category: { $regex: searchTerm, $options: 'i' } // Case-insensitive search by category
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
            userid: parseInt(userid),
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
        const { email, password } = req.body;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('users');
        const user = await collection.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid password" });
        }

        res.status(200).json({ message: "Login successful", userId: user._id });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "Error during login" });
    }
});

app.get('/profile', async (req, res) => {
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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});