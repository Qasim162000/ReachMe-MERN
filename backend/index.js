const express = require('express')
require('dotenv').config();
const connectToMongo = require('./db')

connectToMongo()
const app = express()
const port = process.env.PORT || 6000;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Reach Me Backend listening on port: ${port}`)
})