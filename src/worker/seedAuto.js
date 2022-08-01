require('dotenv').config();
const WebTorrent = require("webtorrent-hybrid");
const client = new WebTorrent();
const fileModel = require("../databases/file")
const mongoose = require('mongoose');
const path = require("path");
const parseMagnetUri = require("parse-magnet-uri");
const appDir = path.dirname(require.main.filename);

console.log(appDir);
mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function run(){

    let fileData =  await fileModel.find()
    console.log(fileData);
    for (let i = 0; i < fileData.length; i++) {
        client.seed(`appDir/storage/Trần Cảnh Tuấn 2.jpg`, function (torrent) {
            console.log('Client is seeding ' + torrent.magnetURI)
        })
    }

}
run()
