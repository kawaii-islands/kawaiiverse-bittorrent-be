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
        let fileName = file.name.substring(file.name.indexOf("/") + 1, file.name.length);
        let notInfoFile = fileHash + "info.json";
        if (notInfoFile != file.name) {
            let fileInFolder = await storage.bucket(bucketName).getFiles(`prefix=${fileHash}`);
            console.log("fileHash", fileHash);
            console.log("fileName", fileName);
            var data = new FormData();
            if (fileInFolder.length == 1) {
                let contents = await file.download();
                data.append('file', contents[0]);
                data.append('tracker', '[]');
                data.append('name', fileName);
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
                let resp = await axios(config);
                console.log(`done seed backup ${JSON.stringify(resp.data.data)}`);
            }
        }
    }
    console.log("done");

}

listFiles().catch(console.error);
