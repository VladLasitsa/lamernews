'use strict';
var mongoose = require('mongoose');

var db = mongoose.createConnection('mongodb://localhost/articles');

db.on('error', console.error);
db.once('open', function() {});

var CommentsSchema = new mongoose.Schema();

CommentsSchema.add({
    username: String,
    text: String,
    link: String,
    date: {
        type: Date,
        default: Date.now
    },
    comments: [CommentsSchema]
});

var ArticleSchema = new mongoose.Schema({
    authorusername: String,
    title: String,
    link: String,
    rating: Number,
    date: Date,
    comments: [CommentsSchema]
});

var Article = db.model("Article", ArticleSchema);

module.exports = Article;
