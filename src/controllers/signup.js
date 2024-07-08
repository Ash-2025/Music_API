const supabase = require('../../config/supabaseConfig');
const { generateApiKey } = require('generate-api-key');
const bcrypt = require('bcrypt');
const sendAPIMail = require('../../util/sendMail')

async function signIn(req, res,) {
    try {
        const { username, email, password } = req.body;
        const api_key = generateApiKey({
            method: 'string',
            pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy1234567890',
            length: 24
        })
        const hashedpassword = await bcrypt.hash(password, 10);
        console.log(hashedpassword + '\n', api_key)

        // create the user object for send email function
        const user = {
            username:username,
            email:email,
            password:password,
            api_key:api_key
        }

        const { data, error } = await supabase.from('user').insert({
            username: username,
            email: email,
            password: hashedpassword,
            api_key: api_key,
            limit: 0,
        });
        if (error) {
            console.log(error);
        }
        console.log(data);

        sendAPIMail(user);
        res.status(200).json({
            'message': "Success! Check your Email(Spam/Inbox) for API KEY",
        })
    } catch (error) {
        console.log(error);
    }
}
module.exports = signIn