require('dotenv').config();
const WebTorrent = require("webtorrent-hybrid");
const client = new WebTorrent();
const fileModel = require("../databases/file")
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function run(){

    let fileData =  await fileModel.find()
    console.log(fileData);
    for (let i = 0; i < fileData.length; i++) {
        // client
    }

}
run()
