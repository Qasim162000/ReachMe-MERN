const connectToMongo = require('./db')
const express = require('express')
require('dotenv').config();
const cors = require('cors')

connectToMongo()
const app = express()
const port = process.env.PORT || 6000;


app.use(cors())
app.use(express.json());

// Available Endpoints
app.use('/api/auth', require("./routes/auth"));


app.listen(port, () => {
    console.log(`Reach Me Backend listening on port: http://localhost:${port}`)
})
