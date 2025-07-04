const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',             
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Article', articleSchema);