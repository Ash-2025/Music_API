const {getDb} = require("../../config/mongo")

async function getSongByName(req,res){
    const songname = req.params.song_name;
    const song = songname.replace(/-/g,' ');
    console.log(song);
    const db = await getDb();
    const collection = db.collection("musico");

    const query = { track_name: { $regex: song, $options: "i" } };
    const result = await collection.find(query).toArray();

    if(result.length > 0){
        return res.json(result);
    }
    else{
        return res.json({
            message:"No song found"
        })
    }
}
module.exports = getSongByName