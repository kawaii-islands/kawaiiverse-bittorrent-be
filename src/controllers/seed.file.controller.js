const webTorrentConfig = require("../webTorrent/config");
const WebTorrent = require("webtorrent-hybrid");
const client = new WebTorrent(webTorrentConfig.requiredOpts());
const path = require("path");
const fs = require("fs");
const parseMagnetUri = require("parse-magnet-uri");
const fileModel = require('../databases/file');
const appDir = path.dirname(require.main.filename);
const googleStorageService = require("../services/google-storage");
const requestSeedService = require("../services/requestSeed");
const {promises: fs1} = require('fs');
const formidable = require('formidable');
const util = require('util');
const createTorrent = require('create-torrent');
const parseTorrent = require('parse-torrent');
const createTorrentPromise = util.promisify(createTorrent);

module.exports = {
    seedFile: async (req, res, next) => {
        try {
            let magnetUrl = req.body.magnet_url;
            let parseManet = parseMagnetUri.parseMagnet(magnetUrl);
            let getTorrent = await client.get(parseManet.infoHash);
            if (getTorrent != null) {
                req.app.io.emit(`seed-done/${parseManet.infoHash}`, {msg: "success"});
                console.log(`already seed - ${parseManet.infoHash}`);
                return res.status(200).send({
                    status: 200, msg: 'success', data: {
                        name: parseManet.name,
                        magnetId: magnetUrl,
                        infoHash: parseManet.infoHash,
                    },
                });
            }

            let result = await addPending(req, magnetUrl, parseManet.infoHash);
            if (typeof result == "string") {
                return res.status(200).send({
                    status: 500, msg: result,
                });
            }
            await requestSeedService.requestSeed(magnetUrl);
            return res.status(200).send({
                status: 200, msg: 'success', data: {
                    name: parseManet.name,
                    magnetId: magnetUrl,
                    infoHash: parseManet.infoHash,
                },
            });
        } catch (e) {
            console.log(e);
            return res.status(200).send({
                status: 500, msg: "internal server",
            });
        }
    },
    seedFileServerToServer: async (req, res, next) => {
        try {
            let magnetUrl = req.body.magnet_url;

            let parseManet = parseMagnetUri.parseMagnet(magnetUrl);

            let getTorrent = await client.get(parseManet.infoHash);
            if (getTorrent != null) {
                console.log("already seed", getTorrent.magnetURI);
                return res.status(200).send({
                    status: 200, msg: 'success', data: {
                        name: parseManet.name,
                        magnetId: magnetUrl,
                        infoHash: parseManet.infoHash,
                    },
                });
            }
            client.add(magnetUrl, {path: `${appDir}/storage`}, async (torrent) => {
                let typeFile = torrent.name.substring(torrent.name.indexOf(".") + 1, torrent.length);
                await fileModel.findOneAndUpdate({
                    hashFile: torrent.infoHash,
                    name: torrent.name,
                }, {
                    hashFile: torrent.infoHash,
                    name: torrent.name,
                    magnetId: magnetUrl,
                    typeFile: typeFile,
                }, {
                    upsert: true,
                    new: true,
                    setDefaultsOnInsert: true,
                });

                console.log(`done download file ${torrent.name} - magnetId - ${magnetUrl}`);
            });


            return res.status(200).send({
                status: 200, msg: 'success', data: {
                    name: parseManet.name,
                    magnetId: magnetUrl,
                    infoHash: parseManet.infoHash,
                },
            });
        } catch (e) {
            console.log(e);
            return res.status(200).send({
                status: 500, msg: "internal server",
            });
        }
    },
    seedBackup: async (req, res, next) => {
        try {
            let form = new formidable.IncomingForm();
            let formData = await new Promise(
                function (resolve, reject) {
                    form.parse(req, (err, fields, files) => {
                        if (err) reject(err);
                        else resolve([fields, files]);
                    });
                });
            let tracker;
            let filePath = [];
            for (let i = 0; i < formData.length; i++) {
                try {
                    if (formData[i].hasOwnProperty('tracker') === true) {
                        tracker = JSON.parse(formData[i].tracker);
                    } else {
                        filePath.push({
                            path: formData[i].file.filepath,
                            name: formData[i].file.originalFilename,
                        });
                    }
                } catch (e) {
                    continue;
                }
            }

            //seed file
            for (let i = 0; i < filePath.length; i++) {
                let torrent = await seedPending(filePath[i].path, filePath[i].name, tracker);
                console.log("torrent.magnetId", torrent.magnetURI);
                filePath[i].magnetURI = torrent.magnetURI;
            }
            return res.status(200).send({
                status: 200, data: filePath,
            });
        } catch (e) {
            console.log(e);
            return res.status(200).send({
                status: 500, msg: "internal server",
            });
        }
    },
};

async function addPending(req, url, hash) {
    return new Promise((resolve, reject) => {
        client.add(url, {private: true}, async (torrent) => {
            torrent.on("download", function (bytes){
                req.app.io.emit(`download/${torrent.infoHash}`, {
                  downloadSpeed: torrent.downloadSpeed,
                  progress: torrent.progress
                });
            });
            torrent.on('done', function () {
                console.log(`done download file ${torrent.name} - magnetId - ${url}`);
                const files = torrent.files;
                files.forEach(async function (file) {
                    await googleStorageService.uploadFile(`${file._torrent.path}/${file.name}`, `${hash}/${file.name}`);
                });
                req.app.io.emit(`seed-done/${torrent.infoHash}`, {msg: "success"});
            });
            resolve(torrent);
        });
    });
}

async function seedPending(url, fileName, tracker) {
    return new Promise(async (resolve, reject) => {
        let contents = await fs.readFileSync(url);
        let encodeTorrent = await createTorrentPromise(contents, {
            name: fileName,
            private: true,
            announce: tracker,
        });
        let parsedTorrent = parseTorrent(encodeTorrent);
        let getTorrent = await client.get(parsedTorrent.infoHash);
        if (getTorrent != null) {
            console.log("already seed", getTorrent.magnetURI);
            resolve(parsedTorrent);
        } else {
            client.seed(contents, {
                name: fileName,
                private: true,
                announce: tracker,
            }, torrent => {
                console.log(`seed done - ${torrent.infoHash} - name - ${fileName}`);
                resolve(torrent);
            });
        }
    });
}
