const express = require('express');
const cookieParser = require('cookie-parser')
const path = require('path');
const app = express();


// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory (This is the correct path)
app.set('views', path.join(__dirname, './src/views'))
;
// app.use(express.static(path.join(__dirname, 'util')));

app.get("/" , (req,res)=>{
    res.render('home');
})

// controllers import
const getRandomSongs = require('./src/controllers/getRandom');

//all of my router imports
const artistRoute = require('./src/router/artist_route')
const songRoute = require('./src/router/songRoute')
const albumRoute = require("./src/router/albumRoute");

//middleware to parse cookies
app.use(cookieParser())


app.get("/music", getRandomSongs)

// dynamic route for search by artists and song_name
app.use("/artists", artistRoute)
app.use("/songs",songRoute)
app.use("/album", albumRoute)


//listen to port
app.listen(3001, () => console.log("Listening on port"));








