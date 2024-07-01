
const {getDb} = require("../config/mongo")

async function getArtistSongs(req, res){

    const artistName = req.params.artist_name
    console.log(artistName);
    try {
        
        const db = await getDb();
        const collection = db.collection("musico")
        
        const query = {artist_names: {$regex : artistName , $options:"i"}};

        const result = await collection.find(query).toArray();

        if(result.length > 0) {
            return res.json(result);
        }
        else{
            return res.json({
                "message":`No songs found for artist ${artistName}`
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Failed to connect to the database"
        })
    }
}

module.exports = getArtistSongs