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

client.seed(`${appDir}/1.png`, {
    private: true,
    announce: ["http://localhost:8000/announce", "http://localhost:8000/stats", "ws://localhost:8000"],
}, torrent => {
    // console.log('torrentId (info hash):', torrent)
    console.log('torrentId (magnet link):', torrent.infoHash);
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
