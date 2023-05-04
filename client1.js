import WebTorrent from "webtorrent-hybrid";

const client = new WebTorrent({
    dht:true,
    peerId: "2d5757303130392d664974732b64434166436176",
    nodeId: "c5489a950cbbc8639b10313263bd60378e6b8cdf",
});
console.log("peerId", client.peerId);
console.log("node", client.nodeId);

async function seedFile() {
    let filePath = Buffer.from("canhtuan", 'utf-8');
    filePath.name = "canhtuan.txt";
    console.log("filePath",filePath);
    client.seed(filePath,
        {
            announce: ["http://localhost:8000/announce"],
        },
        (torrent) => {
            console.log("torrent", torrent.magnetURI);
        },
    );
}



seedFile();
