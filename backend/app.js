require("dotenv").config();
const app = require("express")();
const bodyParser = require("body-parser");
const User = require("./models/user");
const Playlist = require("./models/playlist");
const Songs = require("./models/song");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to db");
  });

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
Playlist.create({ name: "Jazz songs" });

app.use("/", require("./routes"));

// app.use("/", (req, res) => {
//   res.send("music Player API");
// });

app.listen(3000, () => {
  console.log("started on port 3000");
});
