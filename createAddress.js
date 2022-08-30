const dotenv = require('dotenv');
dotenv.config();
const accountSid = process.env.TWILIO_BELL_ROAD_SID;
const authToken = process.env.TWILIO_BELL_ROAD_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.addresses
      .create({
         customerName: 'Ben Ayed',
         street: '1049 El Monte ave #603',
         city: 'Mountain View',
         region: 'CA',
         postalCode: '94040',
         isoCountry: 'US'
       })
      .then(address => console.log(address));