const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SongSchema = new Schema({
    name: {
        type: String
    },
    imageURL: {
        type: String
    },
    audioURL: {
        type: String
    },
    singers: {
        type: [String]
    },
    genre: {
        type: String
    },
    album: {
        type: String
    }
});
const Song = mongoose.model('song', SongSchema);

module.exports = Song;