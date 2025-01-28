const express = require('express');
const mongoose = require("mongoose");
const axios = require('axios');
const router = express.Router();
const Build = require('../models/Build');

mongoose.connect('mongodb+srv://skalap2endra:kGOM7z5V54vBFdp1@cluster0.vannl.mongodb.net/assignment3?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Build: Connected to MongoDB Atlas'))
    .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

router.get('/build', (req, res) => {
    if (req.session.userId === undefined) {
        return res.redirect('/login');
    }

    res.render('tasks/build');
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

router.get('/api/cpus', async (req, res) => {
    const cpuName = req.query.name;
    const url = 'https://comppartsapi.herokuapp.com/computerparts/cpu';

    try {
        const response = await axios(options);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching CPU data:', error);
        res.status(500).json({ error: 'Unable to fetch CPU data' });
    }
});

module.exports = router;