const mongoose = require('mongoose');
require('dotenv').config()
// require('dotenv').config({ path: __dirname + '/.env' })

const mongoURI = process.env.SERVER;

const connectToMongo = async () => {
    await mongoose.connect(mongoURI)
    console.log(`Connected to MongoDB: ${mongoURI} successfully!`)
}

module.exports = connectToMongo;