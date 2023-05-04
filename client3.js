import WebTorrent from "webtorrent-hybrid";

const client = new WebTorrent({
    dht: true,
    nodeId: "ab489a950cbbc8639b10313263bd60378e6b8cdf",
});
console.log("peerId", client.peerId);
console.log("node", client.nodeId);
async function seedFile() {

    client.add("magnet:?xt=urn:btih:373545d14a14c217fe6151b0eb6e67bea4410444&dn=canhtuan.txt&tr=http%3A%2F%2Flocalhost%3A8000%2Fannounce&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com",{
            path: '/Users/admin/Desktop/This-pc/orai/kawaiiverse-bittorrent-be/storage'
    },
        (torrent) => {
            console.log("torrent", torrent.infoHash);
        },
    );
}

seedFile();
