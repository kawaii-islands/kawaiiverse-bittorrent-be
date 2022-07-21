const WebTorrent = require("webtorrent-hybrid");
const client = new WebTorrent();
const path = require("path");
const parseMagnetUri = require("parse-magnet-uri");
const fileModel = require('../databases/file');
const appDir = path.dirname(require.main.filename);
console.log(appDir);

module.exports = {
    seedFile: async (req, res, next) => {
        try {
            let magnetUrl = req.body.magnet_url;

            let parseManet = parseMagnetUri.parseMagnet(magnetUrl);

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
            return res.status(200).send({
                status: 500, msg: "internal server",
            });
        }
    },
};
