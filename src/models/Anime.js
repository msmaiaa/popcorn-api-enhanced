const mongoose = require('mongoose');

const Anime = new mongoose.Schema({
    _id: String,
    title: String,
    year: String,
    slug: String,
    synopsis: String,
    num_seasons: Number,
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
    genres: [String],
})

module.exports = mongoose.model('Anime', Anime);