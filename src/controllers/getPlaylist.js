const {getDb} = require('../../config/mongo');

async function getPlaylist(req,res){
    const playlist_name = req.params.playlist_name
    console.log(playlist_name);
    const collection = (await getDb()).collection(`${playlist_name}`);
    
    const result = collection.find({"index":{$lte:5}});
    const data = await result.toArray();
    res.json(data);
}
async function getFullPlaylist(req,res){
    const playlist_name = req.params.playlist_name
    console.log(playlist_name);
    const collection = (await getDb()).collection(`${playlist_name}`);
    
    const result = collection.find();
    const data = await result.toArray();
    res.json(data);
}

module.exports = {
    getPlaylist,
    getFullPlaylist
}