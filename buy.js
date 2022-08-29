const dotenv = require('dotenv');
dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.incomingPhoneNumbers
    .create({
         phoneNumber: '+16047574779',
         friendlyName: '',
         voiceUrl: 'https://www.your-voice-url.com/example', 
        })
    .then(incoming_phone_number => console.log(incoming_phone_number.sid));