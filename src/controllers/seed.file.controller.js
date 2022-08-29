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
            console.log("start seed",magnetUrl);
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

            let result = await addPending(req, magnetUrl, parseManet);
            if (typeof result == "string") {
                return res.status(200).send({
                    status: 500, msg: result,
                });
            }
            // await requestSeedService.requestSeed(magnetUrl);
            return res.status(200).send({
                status: 200, msg: 'success', data: {
                    name: parseManet.name,
                    magnetId: magnetUrl,
                    infoHash: parseManet.infoHash,
                },
            });
            return res.status(200).send({
                status: 200, msg: "test",
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

            let infoFile = {};
            let filePath;
            for (let i = 0; i < formData.length; i++) {
                try {
                    if (formData[i].hasOwnProperty('tracker') === true) {
                        infoFile.tracker = JSON.parse(formData[i].tracker);
                        infoFile.name = formData[i].name;

                    } else {
                        filePath = formData[i].file.filepath;
                    }
                } catch (e) {
                    continue;
                }
            }

            //seed file
            let torrent = await seedPending(filePath, infoFile);
            return res.status(200).send({
                status: 200, data: {
                    magnetURI: torrent.magnetURI,
                    name: infoFile.name,
                    hash: torrent.infoHash,
                },
            });
        } catch (e) {
            console.log(e);
            return res.status(200).send({
                status: 500, msg: "internal server",
            });
        }
    },
};

async function addPending(req, url, parseManet) {
    return new Promise((resolve, reject) => {
        client.add(url, {private: true}, async (torrent) => {
            torrent.on("download", function (bytes) {
                req.app.io.emit(`download/${torrent.infoHash}`, {
                    downloadSpeed: torrent.downloadSpeed,
                    progress: torrent.progress,
                });
            });
            torrent.on('done', function () {
                console.log(`done download file ${torrent.name} - magnetId - ${url}`);
                const files = torrent.files;
                files.forEach(async function (file) {
                    await googleStorageService.uploadFile(`${file._torrent.path}/${file.name}`, `${parseManet.infoHash}/${file.name}`);
                    await googleStorageService.uploadFileByContent(JSON.stringify({
                        tracker: parseManet.announce,
                    }), `${parseManet.infoHash}/info.json`);
                });
                req.app.io.emit(`seed-done/${torrent.infoHash}`, {msg: "success"});
            });
            resolve(torrent);
        });
    });
}

async function seedPending(url, infoFile) {
    console.log(`start`);
    return new Promise(async (resolve, reject) => {
        let contents = await fs.readFileSync(url);
        let encodeTorrent = await createTorrentPromise(contents, {
            name: infoFile.name,
            private: true,
            announce: infoFile.tracker,
        });
        let parsedTorrent = parseTorrent(encodeTorrent);
        let getTorrent = await client.get(parsedTorrent.infoHash);
        if (getTorrent != null) {
            console.log("already seed", getTorrent.magnetURI);
            resolve(parsedTorrent);
        } else {
            try {
                client.seed(contents, {
                    name: infoFile.name,
                    private: true,
                    announce: infoFile.tracker,
                }, torrent => {
                    console.log(`seed done - ${torrent.infoHash} - name - ${infoFile.name}`);
                    resolve(torrent);
                });
            } catch (e) {
                console.log(e);
            }
        }
    });
}
