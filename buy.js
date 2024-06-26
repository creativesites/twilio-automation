const dotenv = require('dotenv');
dotenv.config();
const accountSid = process.env.TWILIO_BELL_ROAD_SID;
const authToken = process.env.TWILIO_BELL_ROAD_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const jsonfile = require('jsonfile')

const file = './data1.json'
 let obj = []
let data = [
    {
        "friendlyName": "Aaron",
        "rowNum": 3,
        "phoneNumber": "+14843764849"
    },
    {
        "friendlyName": "Alex",
        "rowNum": 4,
        "phoneNumber": "+14845402124"
    },
    {
        "friendlyName": "Barry",
        "rowNum": 5,
        "phoneNumber": "+14843143236"
    },
    {
        "friendlyName": "Billy",
        "rowNum": 6,
        "phoneNumber": "+14845724221"
    },
    {
        "friendlyName": "Bob",
        "rowNum": 7,
        "phoneNumber": "+14845596908"
    },
    {
        "friendlyName": "Bryan",
        "rowNum": 8,
        "phoneNumber": "+14842287051"
    },
    {
        "friendlyName": "Jeremy",
        "rowNum": 9,
        "phoneNumber": "+14846990804"
    },
    {
        "friendlyName": "Marco",
        "rowNum": 10,
        "phoneNumber": "+14842076225"
    },
    {
        "friendlyName": "Tim",
        "rowNum": 11,
        "phoneNumber": "+14846990760"
    },
    {
        "friendlyName": "Tony",
        "rowNum": 12,
        "phoneNumber": "+14842915450"
    },
    {
        "friendlyName": "Adile",
        "rowNum": 13,
        "phoneNumber": "+14848783468"
    },
    {
        "friendlyName": "Antonio",
        "rowNum": 14,
        "phoneNumber": "+14843715332"
    },
    {
        "friendlyName": "Diego",
        "rowNum": 15,
        "phoneNumber": "+14847895951"
    },
    {
        "friendlyName": "Eric",
        "rowNum": 16,
        "phoneNumber": "+14845937831"
    },
    {
        "friendlyName": "Gaud",
        "rowNum": 17,
        "phoneNumber": "+14846036878"
    },
    {
        "friendlyName": "Joon",
        "rowNum": 18,
        "phoneNumber": "+14845529765"
    },
    {
        "friendlyName": "Martin",
        "rowNum": 19,
        "phoneNumber": "+14848783128"
    },
    {
        "friendlyName": "Muhannad",
        "rowNum": 20,
        "phoneNumber": "+14846033443"
    },
    {
        "friendlyName": "Patrick",
        "rowNum": 21
    },
    {
        "friendlyName": "Tami",
        "rowNum": 22
    }
]
let dt = [
    {
        c:'+14844575091',
        b: 'Patrick'
    },
    {
        c: '+14843764952',
        b: 'Tami'
    }
]
let hfd = []
async function hf(){
    dt.forEach(async(el) => {
        client.incomingPhoneNumbers
        .create({
            phoneNumber: el.c,
            friendlyName: el.b,
            addressSid: 'AD741f82422f4f77b513793ed8038bf0e8'
            })
        .then((rs)=>{
            let b = {phoneNumber: rs.phoneNumber}
            hfd.push(b)
            console.log(hfd)
        });
    });
}
hf()
