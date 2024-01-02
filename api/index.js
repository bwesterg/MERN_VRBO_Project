const express = require('express');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');
// const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");
const User = require('./models/User.js');
require('dotenv').config();

app.use(express.json());

const bcryptSalt = bcrypt.genSaltSync(10);

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



app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;

    try {      
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }

})

app.listen(4000);