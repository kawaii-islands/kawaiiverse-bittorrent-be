var requiredOpts = {
    announce: [], // list of tracker server urls
    dht: false,
};


const WebTorrent = require("webtorrent-hybrid");
const path = require("path");
const appDir = path.dirname(require.main.filename);
const client = new WebTorrent(requiredOpts);
console.log("client.peerId", client.peerId);
client.seed(`${appDir}/1.png`, {
    private: true,
    announce: ["ws://localhost:8000","ws://tracker.kawaii.global"],
}, torrent => {
    // console.log('torrentId (info hash):', torrent)
    console.log('torrentId (magnet link):', torrent.infoHash);
});
