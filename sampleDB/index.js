// load env file
require('dotenv').config()
// import express 
const express = require('express')
const router = require('./routes/routes')
require('./db/connection')
// create server using express
const sampleServer = express()
// convert all incoming json data to js data
sampleServer.use(express.json())
sampleServer.use(router)

const PORT = 4002 || process.env.PORT
sampleServer.listen(PORT, () => {
    console.log(`________Project server started at ${PORT}___`);
})