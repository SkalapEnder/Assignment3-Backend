const express = require('express');
const mongoose = require("mongoose");
const axios = require('axios');
const router = express.Router();

const User = require('../models/User');

mongoose.connect('mongodb+srv://skalap2endra:kGOM7z5V54vBFdp1@cluster0.vannl.mongodb.net/assignment3?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Build: Connected to MongoDB Atlas'))
    .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

router.get('/build', (req, res) => {
    if (req.session.userId === undefined) {
        return res.redirect('/login');
    }

    res.render('tasks/build', {products: []});
});

router.get('/api/gpus', async (req, res) => {
    const search = req.query.search; // User's input
    const apiUrl = 'https://raw.githubusercontent.com/voidful/gpu-info-api/gpu-data/gpu.json';

    try {
        const response = await axios.get(apiUrl);
        const allGPUs = response.data;
        const filteredGPUs = [];

        for (const [key, value] of Object.entries(allGPUs)) {
            const searchLower = search.toLowerCase();
            if (value.Model.toLowerCase().includes(searchLower)) {
                filteredGPUs.push({ identifier: key, ...value });
            }
        }

        res.json(filteredGPUs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch GPU data' });
    }
});

router.get('/api/search/:gpu', async (req, res) => {
    const gpuName = req.params.gpu;

    const options = {
        method: 'GET',
        url: 'https://real-time-amazon-data.p.rapidapi.com/search',
        params: {
            query: gpuName,
            page: '1',
            country: 'US',
            sort_by: 'RELEVANCE',
            product_condition: 'ALL',
            is_prime: 'false',
            deals_and_discounts: 'NONE'
        },
        headers: {
            'x-rapidapi-key': '6c6625f883msh2274802339f753fp17f542jsnbd5531f0fdc3',
            'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        const products = response.parameters.data.products;
        res.json({ products: products });
    } catch (error) {
        console.error(error);
        res.render('index', { products: [] });
    }
});

router.post('/add-gpu', async (req, res) => {
    const { userId, gpuLink } = req.body;
    const user = await User.findOne({user_id: userId});
    if (user === null) {
        return res.status(404).json({ message: 'User not found' });
    }
    user.gpus.addToSet(gpuLink);
    await user.save();
    res.redirect('tasks/build');
});

module.exports = router;