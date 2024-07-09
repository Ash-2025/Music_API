const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const cors = require('cors')

//middleware to parse cookies
//middleware to parse form and json data
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(cors())

app.get('/',(req,res)=>{
    res.json({
        'home':'This is home route',
        'go to':'/info route for more info'
    })
})
app.get("/info" , (req,res)=>{
    res.json({
        'Base ULR':'',

        'signUp':'go to /signup route to get api key. api key will be sent to your email',

        'Free routes':'/music | /playlistfree/:playlist_name',

        'route_artists':'/:api_key/artist/:artist_name',
        'route_song':'/:api_key/songs/:song_name',
        'route_album':'/:api_key/album/:album_name',
        'route_playlist':'/playlist/:playlist_name/:api_key | (to access full playlist)',
        'playlist available':'rap91 | bollywoodcentral | bollywoodmush | punjabi101',
        'imp':'Use only first name or last name for artist,albums and songs for now',

    });
})




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
app.use("/playlist",playlistRoute);

//listen to port
app.listen(3000, () => console.log("Listening on port"));








