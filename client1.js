import WebTorrent from "webtorrent-hybrid";

const client = new WebTorrent();

const torrentId = 'magnet:?xt=urn:btih:a656ddccefd0207e6a5c5ea04c29d40271c77102&dn=1GB&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337';
let start = Date.now();
console.log("start", start);
client.add(torrentId, {path: "/Users/admin/Desktop/This-pc/orai/kawaiiverse-bittorrent-be"}, (torrent) => {
    torrent.on('download', function (bytes) {
        console.log('just downloaded: ' + bytes);
        console.log('total downloaded: ' + torrent.downloaded);
        console.log('download speed: ' + torrent.downloadSpeed);
        console.log('progress: ' + torrent.progress);
    });
    console.log(`took ${Date.now() - start}`);
});
