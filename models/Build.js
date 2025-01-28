const mongoose = require('mongoose');

const buildSchema = new mongoose.Schema({
    build_id: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: Number.isInteger,
            message: 'build_id must be an integer',
        },
    },
    user_id: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: Number.isInteger,
            message: 'user_id must be an integer',
        },
    },
    build_content: {
        type: [
            {
                type: {
                    type: String,
                    required: true,
                    enum: ['CPU', 'GPU', 'Motherboard', 'Cooler', 'PSU', 'RAM', 'Storage Disk', 'Case']
                },
                model: {
                    type: String,
                    required: true
                },
                specifications: {
                    type: Object,
                    default: {}
                },
                price: {
                    type: Number,
                    required: true
                }
            }
        ],
        required: true
    },
    total_price: {
        type: Number,
        required: true
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

buildSchema.pre('save', async function (next) { next(); });

const Build = mongoose.model('build_list', buildSchema);
module.exports = Build;

