const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    model_id: { type: Number, required: true },
    history: [{ type: String }],
    favorites: [{ type: String }],
});

const News = mongoose.model('News', newsSchema);

module.exports = News;