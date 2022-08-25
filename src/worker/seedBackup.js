const {Storage} = require('@google-cloud/storage');
const {promises: fs1} = require('fs');
const storage = new Storage({keyFilename: "src/key/kawaii-studio-google-storage.json"});
const bucketName = "storage.kawaii.global";
var FormData = require('form-data');
var fs = require('fs');
const axios = require('axios');

async function listFiles() {
    const [files] = await storage.bucket(bucketName).getFiles();

    for (let i = 0; i < files.length; i++) {
        console.log(`seed - ${i}/${files.length}`);
        let file = files[i];
        let fileHash = file.name.substring(0, file.name.indexOf("/"));
        let notInfoFile = fileHash + "/info.json";

        if (notInfoFile !== file.name) {

            let fileName = file.name.substring(file.name.indexOf("/") + 1, file.name.length);
            console.log(fileName);
            let isExists = await storage.bucket(bucketName).file(`${fileHash}/info.json`).exists();
            console.log("fileHash", fileHash);
            console.log("fileName", fileName);

            let data = new FormData();

            if (isExists[0] == false) {
                let contents = await file.download();
                data.append('file', contents[0]);
                data.append('tracker', '[]');
                data.append('name', fileName);
            } else {
                let info = await storage.bucket(bucketName).file(`${fileHash}/info.json`);
                let download = await info.download();
                let tracker = JSON.parse(download[0].toString())
                data.append('tracker', `${JSON.stringify(tracker.tracker)}`);

                let contents = await file.download();
                data.append('file', contents[0]);
                data.append('name', fileName);
            }

            let config = {
                method: 'post',
                url: 'http://127.0.0.1:9000/v1/request-seed-backup',
                headers: {
                    ...data.getHeaders(),
                },
                maxContentLength: Infinity,
                maxBodyLength: Infinity,
                data: data,
            };
            console.log(`req to server`);
            let resp = await axios(config);
            console.log(`done seed backup ${JSON.stringify(resp.data.data)}`);
        }
    }


    console.log("done");
}

listFiles();
