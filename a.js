const dotenv = require('dotenv');
dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

async function getNum(){
    client.availablePhoneNumbers('US')
    .local
    .list({ limit: 1 })
    .then(local => local.forEach((l) =>{
        console.log(l)
        return l.phoneNumber
    }));
}
async function bk(){
    let d = await getNum()
    await console.log(d)
}
bk()