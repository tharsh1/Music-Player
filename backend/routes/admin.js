const router = require("express").Router();
const Song = require("../models/song");

router.route("/song")
    .get(async (req, res) => {
        try {
            const songs = await Song.find({});
            res.json({ code: 1, data: songs});
        } catch(err) {
            res.json({ code: 0, message: "something went wrong" });
        }  
    })
    .post(async (req, res) => {
        try {
            await Song.create({
                name: req.body.name,
                imageURL: req.body.imageURL,
                audioURL: req.body.audioURL,
                singers: req.body.singers,
                genre: req.body.genre,
                album: req.body.album
            });
            res.json({ code: 1, data: { message: "Songs added successfully" } });
        } catch(err) {
            res.json({ code: 0, message: "something went wrong" });
        }
    })
    .put(async (req, res) => {
        try {
            const updatedSong = await Song.findByIdAndUpdate(req.body.id, {
                name: req.body.name,
                imageURL: req.body.imageURL,
                audioURL: req.body.audioURL,
                singers: req.body.singers,
                genre: req.body.genre,
                album: req.body.album
            }, {new: true});
            res.json({ code: 1, data: { message: "Song updated successfully", updatedSong: updatedSong } });
        } catch(err) {
            res.json({ code: 0, message: "something went wrong" });
        }
    })
    .delete(async (req, res) => {
        try {
            const deletedSong = await Song.findByIdAndDelete(req.body.id);
            res.json({ code: 1, data: { message: "Song deleted successfully", deletedSong: deletedSong } });
        } catch(err) {
            res.json({ code: 0, message: "something went wrong" });
        }
    });

module.exports = router;