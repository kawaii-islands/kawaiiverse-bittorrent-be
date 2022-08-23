const {Storage} = require('@google-cloud/storage');
const {promises: fs1} = require('fs');
const fs = require('fs');
var requiredOpts = {
    announce: [], // list of tracker server urls
    dht: false,
};


const WebTorrent = require("webtorrent-hybrid");
const path = require("path");
const appDir = path.dirname(require.main.filename);
const client = new WebTorrent(requiredOpts);
// Creates a client
const storage = new Storage({keyFilename: "src/key/kawaii-studio-google-storage.json"});

async function listFiles() {
    // Lists files in the bucket
    const [files] = await storage.bucket("storage.kawaii.global").getFiles();

    // files.forEach(file => {
    //     console.log(file);
    // });
    const file = storage.bucket("storage.kawaii.global").file(files[2].name);
    await file.download(function (err, contents) {
        let fileName = files[2].name.substring(files[2].name.indexOf("/") + 1, files[2].name.length);
        console.log("files.name", files[2].name);
        console.log("fileName", fileName);
        fs.writeFile(`${fileName}`, contents, err => {
            if (err) {
                console.error(err);
            }
            client.seed(contents, {
                name: fileName,
                private: true,
                announce: ["tracker.kawaii.global/stats"],
            }, torrent => {
                console.log('torrentId (info hash):', torrent.magnetURI);
                console.log('torrentId (magnet link):', torrent.infoHash);
            });

            // file written successfully
        });
    });
}

listFiles().catch(console.error);
