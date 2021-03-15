const mongoose = require('mongoose');

const Movie = new mongoose.Schema({
    _id: String,
    title: String,
    year: String,
    synopsis: String,
    torrents: {},
    genres: [String],
    images: {
        poster: String,
        fanart: String,
        banner: String
    },
    rating: {
        percentage: Number,
        watching: Number,
        votes: Number,
        loved: Number,
        hated: Number,
    },
})

module.exports = mongoose.model('Movie', Movie);