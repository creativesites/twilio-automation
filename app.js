const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
const accountSid = process.env.TWILIO_BELL_ROAD_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const { GoogleSpreadsheet } = require('google-spreadsheet');
const CREDENTIALS = require('./sheets.json');
const RESPONSES_SHEET_ID = '1gza3a05wWV4bt7c9pMyJsm43hpbCpPx84Uctym2zjOg';
const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID);
var app = express();
app.use(function (err, req, res, next) {

    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});
const PORT = 3005;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
let num
function getIndex(ab){
    return (ab / 2) + 1
}
async function run(gnum) {
    await doc.useServiceAccountAuth({
        client_email: CREDENTIALS.client_email,
        private_key: CREDENTIALS.private_key
    });
    
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle['BuyNumbers'];
    console.log(sheet.title);
    await sheet.loadCells('D1:E1');
    
     
    async function getNum(){
        client.availablePhoneNumbers('US')
        .local
        .list({areaCode: 484, limit: 1 })
        .then(local => local.forEach((l) =>{
            num = l.phoneNumber
            console.log(num)
        }));
    }
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
    for (let index = 0; index < gnum.length; index++) {
        const element = gnum[index];
        let fname = element.friendlyName;
        let rowNum = element.rowNum;
        await getNum()
        try {
            await buyNum(fname,  rowNum)
        } catch (error) {
            setTimeout(async() => {
                await buyNum(fname, rowNum) 
            }, 6000);
        }
        
    }

}

//run()
app.post('/twilioNumbers', (req, res) => {
    
    let gnum = req.body.nums
    console.log(gnum)
    run(gnum)
    res.send('Backup Started')

})

app.use(function (req, res, next) {
    next(createError(404));
});

app.listen(PORT, () => console.log(`backend running on port ${PORT}`))


