const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const User = require('./models/User.js');
const cookieParser = require('cookie-parser');

require('dotenv').config();


const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'kjasdfuidk77dbdbujj4k4';

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_URL);
// console.log(process.env.MONGO_URL);
// console.log('check nodemon console w/ mongoose, dotenv, express');


app.get('/test', (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    res.json('test ok5');
});

app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;

    try {      
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }
});

app.post('/login', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {email, password} = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({
                    email:userDoc.email, 
                    id:userDoc._id,
                    name:userDoc.name
                }, jwtSecret, {}, (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json(userDoc);
            });
        } else {
            res.status(422).json('password NOT ok');
        }
    } else {
        res.json('not found');
    }
});

app.get('/profile', (req,res) => {
    // mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const {name, email, _id} = await User.findById(userData.id);
            res.json({name, email, _id});
        })
    } else {
        res.json(null);
    }
})

app.listen(4000); 