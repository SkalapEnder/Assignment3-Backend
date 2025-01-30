const mongoose = require('mongoose');

const gpuSchema = new mongoose.Schema({
    model_id: { type: Number, ref: 'User', required: true },
    history: [{ type: String }],
    favorites: [{ type: String }],
});

const GPU = mongoose.model('GPU', gpuSchema);

module.exports = GPU;