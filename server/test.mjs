import { MongoClient } from 'mongodb';

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function testConnection() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  } finally {
    await client.close();
  }
}

testConnection();