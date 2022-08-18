// import WebTorrent from "webtorrent-hybrid";
const WebTorrent = require("webtorrent-hybrid");
const path = require("path");
const fs = require('fs');
const appDir = path.dirname(require.main.filename);
console.log(appDir);
const client = new WebTorrent({dht: false});

// const torrentId = "magnet:?xt=urn:btih:3fb75b110b96fbcc9f34f65ea6ffd03be17618fd&dn=bridge_1_b.png&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337"
const torrentId = "magnet:?xt=urn:btih:57359e8054c54a25a757974d62f1075d542bd52e&dn=10.png&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337";
// let torrent = parseMagnet(torrentId);

// client.seed(torrentId, {path: `${appDir}/src/storage`}, torrent => {
//     console.log(torrent);
//
//     // fs.writeFile(`${appDir}/storage/${torrent.name}`, torrent.torrentFile);
//     console.log("done");
// });

// client.seed(`${appDir}/1.png`, {
//     private: true,
//     announce: ["http://localhost:8000/announce", "http://localhost:8000/stats", "ws://localhost:8000"],
// }, torrent => {
//     // console.log('torrentId (info hash):', torrent)
//     console.log('torrentId (magnet link):', torrent.infoHash);
// });

let url = "magnet:?xt=urn:btih:a76c309df7226d1d6d37f038819c7bb5c07f3e2d&dn=A%CC%89nh+chu%CC%A3p+Ma%CC%80n+hi%CC%80nh+2022-08-10+lu%CC%81c+22.55.19+(1).png&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337"
client.add(url, {path: `${appDir}/storage/`}, async (torrent) => {
    torrent.on('download', function (bytes) {
        console.log('just downloaded: ' + bytes)
        console.log('total downloaded: ' + torrent.downloaded)
        console.log('download speed: ' + torrent.downloadSpeed)
        console.log('progress: ' + torrent.progress)
    })
    torrent.on('done', function(){
        console.log('torrent finished downloading')

    })
});



//
// const crypto = require("crypto")
// const fs = require('fs').promises;
//
//
// async function run(){
//     const data = await fs.readFile("/Users/admin/Desktop/This-pc/orai/kawaiiverse-bittorrent-be/src/storage/10.png", "utf8");
//     let hashFile = crypto.createHash('sha256').update(data).digest('hex');
//     console.log(hashFile);
// }
// run();
