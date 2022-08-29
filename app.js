const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
var app = express();
app.use(function (err, req, res, next) {

    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});
const PORT = 3004;

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
     
    async function getNum(){
        client.availablePhoneNumbers('US')
        .local
        .list({ limit: 1 })
        .then(local => local.forEach((l) =>{
            num = l.phoneNumber
        }));
    }
    async function buyNum(){
        client.incomingPhoneNumbers
        .create({
            phoneNumber: num,
            friendlyName: fname,
            voiceUrl: url, 
            })
        .then(incoming_phone_number => console.log(incoming_phone_number.sid));
    }
    for (let index = 0; index < gnum.length; index++) {
        const element = gnum[index];
        let fname = element.friendlyName;
        let url = element.voiceUrl;
        await getNum()
        try {
            await buyNum(fname, url)
        } catch (error) {
            setTimeout(async() => {
                await buyNum(fname, url) 
            }, 6000);
        }
        
    }

}

//run()
app.post('/twilioNumbers', (req, res) => {
    
    let gnum = req.body
    run(gnum)
    res.send('Backup Started')

})

app.use(function (req, res, next) {
    next(createError(404));
});

app.listen(PORT, () => console.log(`backend running on port ${PORT}`))


