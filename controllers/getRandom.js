const {getDb} = require("../config/mongo")

let songs_global = [];
async function getRandomSongs(req, res){
    console.log(req);
    let bound = Date.now() + 1000 * 5 * 60;
    const isbound = req.cookies?.Time;

    if (isbound > Date.now()) {
        res.json({
            message: "You're still within 5 minutes bounds! Try again after 5 minutes",
            "list": songs_global
        })
    } 
    else {
        try {
            const db = await getDb();
            const collection = db.collection("musico")

            songs_global = await collection.aggregate([
                { $sample: { size: 10 } }
            ]).toArray();

            bound = Date.now() + 1000 * 5 * 60;
            res.cookie("Time", bound)
            res.json(songs_global);

        } catch (error) {
            console.log("Error connecting to mongodb: ", error);
            res.status(500).json({
                message: "Error connecting to mongodb"
            })
        }
    }
}

module.exports = getRandomSongs