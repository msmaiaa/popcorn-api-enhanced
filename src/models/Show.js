const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Show = new mongoose.Schema({
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

Show.plugin(mongoosePaginate);

module.exports = mongoose.model('Show', Show);