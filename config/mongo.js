const { MongoClient } = require('mongodb')

require('dotenv').config()

const uri = process.env.URI;

const client = new MongoClient(uri)

async function connectToMongoDb(){
    try {
        // Connect the client to the MongoDB server
        await client.connect();
        console.log("Connected to MongoDB Atlas");

    } catch (error) {
        console.error("Error connecting to MongoDB Atlas:", error);
    }
}
async function getDb() {
    await connectToMongoDb();
    return client.db("music");
}
module.exports = {getDb}