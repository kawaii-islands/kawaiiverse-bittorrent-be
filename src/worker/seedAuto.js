require('dotenv').config();
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const data = new FormData();
const mongoose = require('mongoose');
const parseMagnetUri = require("parse-magnet-uri");
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
            try {
                console.log("request seed", `${directoryPath}/${file}`);
                data.append('file', fs.createReadStream(`${directoryPath}/${file}`));
                let config = {
                    method: 'post',
                    url: 'http://127.0.0.1:9000/v1/update-file',
                    headers: {
                        ...data.getHeaders()
                    },
                    data : data
                };

                await axios(config)
            } catch (err) {
                console.log(err);
            }
        });
    });

}

run();
