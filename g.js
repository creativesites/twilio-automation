const dotenv = require('dotenv');
dotenv.config();
const accountSid = process.env.TWILIO_BELL_ROAD_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const { GoogleSpreadsheet } = require('google-spreadsheet');
const CREDENTIALS = require('./sheets.json');
const RESPONSES_SHEET_ID = '1gza3a05wWV4bt7c9pMyJsm43hpbCpPx84Uctym2zjOg';
const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID);
let num
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
    client.availablePhoneNumbers('US')
    .local
    .list({areaCode: 484, limit: 1 })
    .then(local => local.forEach((l) =>{
        num = l.phoneNumber
        console.log(num)
    }));
}


async function dg(){
    await doc.useServiceAccountAuth({
        client_email: CREDENTIALS.client_email,
        private_key: CREDENTIALS.private_key
    });
    
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle['BuyNumbers'];
    console.log(sheet.title);
    await sheet.loadCells('D1:E1');
    async function buyNum(fname, rowNum){
        client.incomingPhoneNumbers
        .create({
            phoneNumber: num,
            friendlyName: fname,
            addressSid: 'AD741f82422f4f77b513793ed8038bf0e8'
            })
        .then(async(incoming_phone_number) =>{
            let cell = D + rowNum
            const c61 = await sheet.getCellByA1(cell);
            c61.value = incoming_phone_number.phone_number
            await sheet.saveUpdatedCells();
            console.log('update written to sheet')
            console.log(incoming_phone_number.phone_number)
        });
    }
    for (let index = 0; index < c.length; index++) {
        const element = c[index];
        let fname = element.friendlyName;
        let rowNum = element.rowNum;
        await getNum().then(async()=>{
            await buyNum(fname,  rowNum)
        }).catch((err)=>{
            console.log(err)
        })
        
        
    }
}
  
dg()