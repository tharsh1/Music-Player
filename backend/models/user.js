const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    playlists: [{
        type: Schema.Types.ObjectId,
        ref: "playlist"
    }]
});

const User = mongoose.model("user", UserSchema);

module.exports = User;