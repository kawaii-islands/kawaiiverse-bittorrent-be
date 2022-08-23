var requiredOpts = {
    announce: [], // list of tracker server urls
    dht: false,
};


const WebTorrent = require("webtorrent-hybrid");
const path = require("path");
const appDir = path.dirname(require.main.filename);
const client = new WebTorrent(requiredOpts);
console.log("client.peerId", client.peerId);
client.seed(`/Users/admin/Desktop/This-pc/orai/kawaiiverse-bittorrent-be/1950.png`, {
    private: true,
    announce: ["tracker.kawaii.global/stats"],
}, torrent => {
    console.log('torrentId (info hash):', torrent.magnetURI)
    console.log('torrentId (magnet link):', torrent.infoHash);
});
