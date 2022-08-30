const { GoogleSpreadsheet } = require('google-spreadsheet');
const CREDENTIALS = require('./sheets.json');
const RESPONSES_SHEET_ID = '1gza3a05wWV4bt7c9pMyJsm43hpbCpPx84Uctym2zjOg';
const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID);
const axios = require('axios')
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
async function ds(){
    await doc.useServiceAccountAuth({
        client_email: CREDENTIALS.client_email,
        private_key: CREDENTIALS.private_key
    });
    
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle['BuyNumbers'];
    console.log(sheet.title);
    await sheet.loadCells('D1:E1');
    
    
    data.forEach(async(el) => {
        setTimeout(() => {
            
        }, 3000);
        let cell = 'D' + el.rowNum
        const c61 = await sheet.getCellByA1(cell);
        setTimeout(() => {
            
        }, 3000);
        c61.value = el.phoneNumber
        await sheet.saveUpdatedCells();
        console.log('update written to sheet')
    });
}
//ds()
let data1 = [ { phoneNumber: '+14844575091' }, { phoneNumber: '+14843764952' } ]
async function pushData(){
    var data4 = JSON.stringify(data1);
    var config = {
        method: 'post',
        url: 'https://script.google.com/macros/s/AKfycbw9OYAd3AQd4IBPBjpWovKVbUJwUrnnUSmAZlNNAGwNbaCgMKODo9iFAN_AADMAUZvh/exec?gid=2005867970',
        headers: {
        'Content-Type': 'application/json'
        },
        data: data4
    };

    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
    console.log(error);
    });
}

pushData()