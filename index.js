const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors')
const routes = require('./routes/routes.js')

const mongoString = process.env.DATABASE_URI

mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();

app.use(cors())
app.use(express.json());
app.use('/api', routes)
const port = process.env.PORT || 3003

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})