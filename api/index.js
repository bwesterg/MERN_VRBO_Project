const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_URL);
// console.log(process.env.MONGO_URL);
// console.log('check nodemon console w/ mongoose, dotenv, express');


app.get('/test', (req, res) => {
    res.json('test ok4');
});

//8x7zPJeLzQfD7CIg

app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    res.json({name, email, password});
})

app.listen(4000);