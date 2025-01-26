const express = require('express');
const User = require('../models/User');
const mongoose = require("mongoose");
const router = express.Router();

mongoose.connect('mongodb+srv://skalap2endra:kGOM7z5V54vBFdp1@cluster0.vannl.mongodb.net/assignment3?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('News: Connected to MongoDB Atlas'))
    .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

router.get('/news', (req, res) => res.render('tasks/news'));

module.exports = router;