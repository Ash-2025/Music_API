const nodemailer = require('nodemailer')
async function sendAPIMail(user){

    const {username,email,password,api_key} = user

    nodemailer.createTestAccount((err) => {
        if(err){
            console.log(err.message);
            return process.exit(1);
        }
        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth: {
                user: 'yahikouzumaki528@gmail.com',
                pass: 'fllhqubvzgarqvjz '
            }
        });

        let message = {
            from:"Ash <yahikouzumaki528@gmail.com>",
            to: `${username} <${email}>`,
            subject:`Thanks for signing for the API!`,
            text:`
            Here's your account details😀
            Email: <${email}>
            Password: <${password}>
            Username: <${username}>
            API_KEY - ${api_key}
                `
        }

        transporter.sendMail(message,(err,info)=>{
            if (err) {
                console.log('Error occurred. ' + err.message);
            }
            console.log(info);
            
        })
    })
}
module.exports = sendAPIMail