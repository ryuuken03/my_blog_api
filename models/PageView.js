const mongoose = require('mongoose');

const pageViewSchema = new mongoose.Schema({
    articleId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Article',             
        required: true
    },
    readAt: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true
});
pageViewSchema.pre('save', function (next) {
    this.readAt = new Date();
    next();
});

module.exports = mongoose.model('PageView', pageViewSchema);