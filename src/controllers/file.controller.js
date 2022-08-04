const formidable = require('formidable');
const {validationResult} = require('express-validator');
const WebTorrent = require("webtorrent");
const crypto = require("crypto");
const client = new WebTorrent();
const path = require("path");
const {promises: fs1} = require('fs');
const fs = require('fs');
const appDir = path.dirname(require.main.filename);

const fileModel = require("../databases/file");

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

            await client.seed(`${appDir}/storage/${nameFile}`, async (torrent) => {
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

            });

            let fileInfo = await fileModel.findOne({
                name: nameFile,
            });

            return res.status(200).send({
                status: 200, msg: 'success', data: {
                    hashFile: fileInfo.hashFile,
                    name: fileInfo.name,
                    magnetId: fileInfo.magnetId,
                    typeFile: fileInfo.typeFile,
                },
            });

        } catch (e) {
            console.log(e);
            return res.status(200).send({status: 500, msg: 'internal server'});
        }
    },
};
