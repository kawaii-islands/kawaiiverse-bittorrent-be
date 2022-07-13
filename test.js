const WebTorrent = require("webtorrent");

const client = new WebTorrent({
    peerId:"2d5757303130382d7a50496b48315a3662794549",
    nodeId:"7207a7a98d643c56e26aff1c7ad007e80be7f7fc",
    torrentPort: 3000,
    dhtPort: 3001,

})
console.log("client",client);
const filePath = "2022-06-16 10.23.49.jpg"
console.log('filePath:', filePath)
client.seed(filePath, torrent => {
    console.log('torrentId (info hash):', torrent.infoHash)
    console.log('torrentId (magnet link):', torrent.magnetURI)
})
