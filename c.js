const fs = require("fs");
const { stringify } = require("csv-stringify");
const filename = "twilio.csv";
const writableStream = fs.createWriteStream(filename);
const columns = [
    "TWILIO_ACCOUNT_SID",
    "TWILIO_AUTH_TOKEN",
    "TWILIO_BELL_ROAD_SID",
    "TWILIO_BELL_ROAD_AUTH_TOKEN"
  ];
  const stringifier = stringify({ header: true, columns: columns });
let row = 
  stringifier.write(row);
  stringifier.pipe(writableStream);
console.log("Finished writing data");
  