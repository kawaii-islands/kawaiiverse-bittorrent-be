const webTorrentConfig = require("../webTorrent/config");
const formidable = require('formidable');
const WebTorrent = require("webtorrent-hybrid");
const parseTorrent = require('parse-torrent');
const client = new WebTorrent(webTorrentConfig.requiredOpts());
const createTorrent = require('create-torrent');
const path = require("path");
const {promises: fs1} = require('fs');
const fs = require('fs');
const appDir = path.dirname(require.main.filename);

const fileModel = require("../databases/file");
const util = require('util');
const requestSeedService = require('../services/requestSeed');

module.exports = {
    updateFile: async (req, res, next) => {
        try {
            const data = new formidable.IncomingForm();

            const formFields = await new Promise(function (resolve, reject) {
                data.parse(req, function (err, fields, files) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(fields);
                });
            });

            const typeFile = data.openedFiles[0].mimetype.substring(data.openedFiles[0].mimetype.indexOf("/") + 1, data.openedFiles[0].mimetype.length);

            let dataFilePath = await data.openedFiles[0].filepath;
            let dataFile = await fs.readFileSync(dataFilePath);
            let nameFile = data.openedFiles[0].originalFilename;

            await fs1.writeFile(`${appDir}/storage/${nameFile}`, dataFile);

            const createTorrentPromise = util.promisify(createTorrent);
            let torrent = await createTorrentPromise(`${appDir}/storage/${nameFile}`);
            let parsedTorrent = parseTorrent(torrent);
            let isCheck = await client.get(parsedTorrent.infoHash);
            if (!isCheck) {
                torrent = await seedPending(`${appDir}/storage/${nameFile}`);
                console.log(`seed name ${nameFile} - hash - ${torrent.infoHash}`);
                await requestSeedService.requestSeed(torrent.magnetURI);
                await fileModel.findOneAndUpdate({
                    hashFile: torrent.infoHash,
                    name: nameFile,
                }, {
                    hashFile: torrent.infoHash,
                    name: nameFile,
                    magnetId: torrent.magnetURI,
                    typeFile: typeFile,
                }, {
                    upsert: true,
                    new: true,
                    setDefaultsOnInsert: true,
                });
                return res.status(200).send({
                    status: 200, msg: 'success', data: {
                        hashFile: torrent.infoHash,
                        name: nameFile,
                        magnetId: torrent.magnetURI,
                        typeFile: typeFile,
                    },
                });
            }
            console.log(parsedTorrent.infoHash);
            let fileInfo = await fileModel.findOne({
                hashFile: parsedTorrent.infoHash,
            });


            return res.status(200).send({
                status: 200, msg: 'success', data: {
                    hashFile: parsedTorrent.infoHash,
                    name: nameFile,
                    magnetId: fileInfo.magnetId,
                    typeFile: typeFile,
                },
            });

        } catch (e) {
            console.log(e);
            return res.status(200).send({status: 500, msg: 'internal server'});
        }
    },
};

async function seedPending(url) {
    return new Promise((resolve, reject) => {
        client.seed(url, async (torrent) => {
            resolve(torrent);
        });
    });
}
