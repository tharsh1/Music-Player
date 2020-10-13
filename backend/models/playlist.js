const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
    name: {
        type: String
    },
    songs: [{
        type: Schema.Types.ObjectId,
        ref: "song"
    }],
    isAdmin : {type : Boolean , default:false},

});

const Playlist = mongoose.model('playlist', PlaylistSchema);

module.exports = Playlist;