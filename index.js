const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();


// controllers import
const getRandomSongs = require('./controllers/getRandom');

//all of my router imports
const artistRoute = require('./router/artist_route')
const songRoute = require('./router/songRoute')
const albumRoute = require("./router/albumRoute")

//middleware to parse cookies
app.use(cookieParser())


app.get("/music", getRandomSongs)

// dynamic route for search by artists and song_name
app.use("/artists", artistRoute)
app.use("/songs",songRoute)
app.use("/album", albumRoute)


//listen to port
app.listen(3000, () => console.log("Listening on port"));