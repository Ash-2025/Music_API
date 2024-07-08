const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();

app.get("/info" , (req,res)=>{
    res.json({
        'Base ULR':'',
        'route_artists':'/artists/:artist_name',
        'route_song':'/songs/:song_name',
        'route_album':'/album/:album_name',
        'route_random':'/music',
        'tip':'To use full name seprate it with -, for ex: ed sheeran becomes ed-sheeran',
    });
})

//middleware to parse cookies
//middleware to parse form and json data
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())



// controllers import
const getRandomSongs = require('./src/controllers/getRandom');
app.get("/music", getRandomSongs)

//all of my router imports
const signIn = require('./src/router/signRoute');
const artistRoute = require('./src/router/artist_route')
const songRoute = require('./src/router/songRoute')
const albumRoute = require("./src/router/albumRoute");
const playlistRoute = require("./src/router/playlistRoute")


//custom middleware imports
const checkApi = require('./src/middleware/api_verify')


// authentication routes
app.use("/signIn" , signIn);


// dynamic route for search by artists and song_name
app.use("/:api_key/artist",checkApi, artistRoute)
app.use("/:api_key/songs",checkApi,songRoute)
app.use("/:api_key/album",checkApi, albumRoute)

//playlist route
app.use("/playlistfree",playlistRoute);
app.use("/playlist",checkApi,playlistRoute);

//listen to port
app.listen(3000, () => console.log("Listening on port"));








