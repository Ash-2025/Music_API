const {getDb} = require("../../config/mongo")

async function getAlbum(req,res){
    const album = req.params.album_name;

    try {
        
        const db = await getDb();
        const collection = db.collection("musico")
        
        const query = {album_name: {$regex : album , $options:"i"}};

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

module.exports = getAlbum