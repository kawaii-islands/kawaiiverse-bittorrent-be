import WebTorrent from "webtorrent-hybrid";

async function seedFile1() {
    const client = new WebTorrent();
    console.log("peerId", client.peerId);
    let filePath = "/Users/admin/Desktop/This-pc/orai/kawaiiverse-bittorrent-be/storage/150MB";

    client.seed(filePath,
        (torrent) => {
            console.log("torrent", torrent.infoHash);
        },
    );
}

async function seedFile2() {
    const client = new WebTorrent();
    console.log("peerId", client.peerId);
    let filePath = "/Users/admin/Desktop/This-pc/orai/kawaiiverse-bittorrent-be/storage/150MB";

    client.seed(filePath,
        (torrent) => {
            console.log("torrent", torrent.infoHash);
        },
    );
}

seedFile1();
seedFile2();
