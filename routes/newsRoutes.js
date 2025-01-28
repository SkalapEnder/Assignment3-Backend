const express = require('express');
const User = require('../models/User');
const mongoose = require("mongoose");
const router = express.Router();

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('b2486c9f9e994497847a79e02ac4a8f8');

mongoose.connect('mongodb+srv://skalap2endra:kGOM7z5V54vBFdp1@cluster0.vannl.mongodb.net/assignment3?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('News: Connected to MongoDB Atlas'))
    .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

router.get('/news', async (req, res) => {
    if (req.session.userId === undefined) {
        return res.redirect('/login');
    }
    const uniqueArticles = [];

    try {
        // Define search query for news related to GPUs, CPUs, and computer parts
        const queries = ['GPU', 'CPU', 'AMD', 'Intel', 'PC', 'NVIDIA', 'Ryzen'];

        for (const query of queries) {
            const response = await newsapi.v2.topHeadlines({
                q: query,
                category: 'technology',
                language: 'en'
            });

            // Extract articles from the response
            const allArticles = response.articles || [];

            // Create a set of unique articles based on their URL

            const urls = new Set();

            for (const article of allArticles) {
                const content = `${article.title} ${article.description} ${article.content}`.toLowerCase();
                const hasKeyword = queries.some(keyword => content.includes(keyword.toLowerCase()));

                if (hasKeyword && !urls.has(article.url)) {
                    uniqueArticles.push(article);
                    urls.add(article.url);
                }
            }
        }

        res.render('tasks/news', { articles: uniqueArticles });
    } catch (error) {
        console.error('Error fetching news:', error);

        // Render the page with an empty articles array in case of an error
        res.render('tasks/news', { articles: [] });
    }
});

module.exports = router;