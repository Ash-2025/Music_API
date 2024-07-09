const supabase = require('../../config/supabaseConfig');

async function checkApi(req, res, next) {

    try {
        const key = req.params.api_key;
        console.log(key);
        const { data, error } = await supabase.from('user').select('api_key,limit').eq('api_key', key);
        
        console.log(data);
        console.log(data.length);
        if (data.length==0 || error) {
            return res.status(404).json({
                Message:'Api key not found'
            });
        }
        
        const li = data[0]?.limit ?? -1;

        console.log(li);
        if (li !== -1) {
            if(li>=100){
                return res.status(403).json({
                    'Message': 'Limit exceeded'
                })
            }
            const { err } = await supabase.from('user').update({ limit: li + 1 }).eq('api_key', key);
            if(err){
                console.log(err);
            }
        }
        console.log('going to next');
        next();
    } catch (err) {
        console.log(err);
    }

}
module.exports = checkApi