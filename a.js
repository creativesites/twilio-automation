const dotenv = require('dotenv');
dotenv.config();
const accountSid = process.env.TWILIO_BELL_ROAD_SID;
const authToken = process.env.TWILIO_BELL_ROAD_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const jsonfile = require('jsonfile')

const file = './data.json'
 let obj = []
 let c = [
    { friendlyName: 'Aaron', rowNum: 3 },
    { friendlyName: 'Alex', rowNum: 4 },
    { friendlyName: 'Barry', rowNum: 5 },
    { friendlyName: 'Billy', rowNum: 6 },
    { friendlyName: 'Bob', rowNum: 7 },
    { friendlyName: 'Bryan', rowNum: 8 },
    { friendlyName: 'Jeremy', rowNum: 9 },
    { friendlyName: 'Marco', rowNum: 10 },
    { friendlyName: 'Tim', rowNum: 11 },
    { friendlyName: 'Tony', rowNum: 12 },
    { friendlyName: 'Adile', rowNum: 13 },
    { friendlyName: 'Antonio', rowNum: 14 },
    { friendlyName: 'Diego', rowNum: 15 },
    { friendlyName: 'Eric', rowNum: 16 },
    { friendlyName: 'Gaud', rowNum: 17 },
    { friendlyName: 'Joon', rowNum: 18 },
    { friendlyName: 'Martin', rowNum: 19 },
    { friendlyName: 'Muhannad', rowNum: 20 },
    { friendlyName: 'Patrick', rowNum: 21 },
    { friendlyName: 'Tami', rowNum: 22 }
  ]
async function getNum(){
    await client.availablePhoneNumbers('US')
    .local
    .list({areaCode: 484, limit: 2,  })
    //.list({ limit: 5 })
    .then(local => local.forEach((l, i) =>{
        c[i].phoneNumber = l.phoneNumber
        console.log(l.phoneNumber)
       obj.push(l)
    }));
}
getNum()
setTimeout(() => {
    jsonfile.writeFile(file, c)
  .then(res => {
    console.log('Write complete')
  })
  .catch(error => console.error(error))
}, 8000);