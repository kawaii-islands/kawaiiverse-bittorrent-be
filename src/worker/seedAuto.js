require('dotenv').config();
const fileModel = require("../databases/file");
const mongoose = require('mongoose');
const parseMagnetUri = require("parse-magnet-uri");
const fs = require('fs');
const fs1 = require('fs/promises');
const appRoot = require('app-root-path');
const directoryPath = appRoot.path + "/src/storage";

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function run() {
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        files.forEach(async function (file) {
            console.log(file);
            try {
                console.log("request seed", `${directoryPath}/${file}`);
                const data = await fs1.readFile(`${directoryPath}/${file}`);
                console.log(data);
            } catch (err) {
                console.log(err);
            }
        });
    });

}

run();
