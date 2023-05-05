import WebTorrent from "webtorrent-hybrid";

const client = new WebTorrent();

const torrentId = 'magnet:?xt=urn:btih:c09006da56f8f0b90d6a7baf90f1ba723aff7d63&dn=150MB&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337';
let start = Date.now();
console.log("start", start);
client.add(torrentId, {path: "/Users/admin/Desktop/This-pc/orai/kawaiiverse-bittorrent-be"}, (torrent) => {
    torrent.on('download', function (bytes) {
        console.log('just downloaded: ' + bytes);
        console.log('total downloaded: ' + torrent.downloaded);
        console.log('download speed: ' + torrent.downloadSpeed);
        console.log('progress: ' + torrent.progress);
    });
    torrent.on('done', function (bytes) {
        console.log('torrent finished downloading')
        console.log(`took ${Date.now() - start}`);
    });

});
