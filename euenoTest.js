// const fs = require('fs');
// import Eueno from "eueno-library";
// import fs from 'fs/promises';

const Eueno = require("eueno-library")
const fs = require("fs").promises

async function test() {
    let eueno = new Eueno({
        endpoint: "https://developers.eueno.io",
    });

    let file = await fs.readFile("/Users/admin/Desktop/This-pc/orai/eueno-library/1.png");

    let data = await eueno.upload(file, {
        bucketKey: "DDCA6909FFC7BC354321E8361F5804456C013B2C3700200D4BC8DD3A872F507C",
    }, {
        "contentLength": 533143,
        "contentType": "image/jpeg",
        "filename": "274823036_509801993839064_5358522198385695325_n.jpg",
        "action": "write",
        "encryption": "no",
    });
    console.log("data", data);

}

test();
