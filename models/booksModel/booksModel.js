const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Book Schema

const bookSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    trending: {
        type: Boolean,
        required: true
    },

    coverImage: {
        type: String,
        required: true
    },
    
    oldPrice: {
        type: Number,
        required: true
    },

    newPrice: {
        type: Number,
        required: true
    },

}, {timestamps: true})

module.exports = mongoose.model('Book', bookSchema);
