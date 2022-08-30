const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'twilio.csv',
  header: [
    {id: 'sid', title: 'TWILIO_ACCOUNT_SID'},
    {id: 'auth', title: 'TWILIO_AUTH_TOKEN'},
    {id: 'brsid', title: 'TWILIO_BELL_ROAD_SID'},
    {id: 'brauth', title: 'TWILIO_BELL_ROAD_AUTH_TOKEN'},
  ]
});

const data = [
  {
    sid: 'AC0d0d4b9ff09b3d53fb7aa489421437a0',
    auth: '088b7ef150d78b0963b6b68f039a7f73',
    brsid: 'AC652ec7ced40dd663123637b027d53c47',
    brauth: 'e40855f8e553f09a1931f15464b50343'
  }
];

csvWriter
  .writeRecords(data)
  .then(()=> console.log('The CSV file was written successfully'));