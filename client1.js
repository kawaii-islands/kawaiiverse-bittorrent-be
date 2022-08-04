var requiredOpts = {
    infoHash: new Buffer('012345678901234567890'), // hex string or Buffer
    peerId: new Buffer('01234567890123456789'), // hex string or Buffer
    announce: [], // list of tracker server urls
    dht: false
}


const WebTorrent = require("webtorrent-hybrid");
const path = require("path");
const appDir = path.dirname(require.main.filename);
const client = new WebTorrent(requiredOpts);

console.log("client.peerId",client.peerId);
client.seed(`${appDir}/1.png`, {
    private: true,
    announce: ["http://localhost:8000/announce", "http://localhost:8000/stats", "ws://localhost:8000"],
}, torrent => {
    // console.log('torrentId (info hash):', torrent)
    console.log('torrentId (magnet link):', torrent.infoHash);
});
