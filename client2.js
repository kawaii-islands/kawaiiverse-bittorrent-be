import WebTorrent from "webtorrent-hybrid";

const client = new WebTorrent({
    dht: false,
});
console.log("peerId", client.peerId);

async function seedFile() {
    let filePath = "/Users/admin/Desktop/This-pc/orai/kawaiiverse-bittorrent-be/1.png";

    client.seed(filePath,
        {
            private: true,
            announce: ["wss://tracker.eueno.io", "https://tracker.eueno.io/announce", "http://localhost:8000/announce"],
            urlList: ["https://storage.googleapis.com/data.eueno.io/test/1.png"],
            getAnnounceOpts: () => {
                return {
                    "x-api-key": "ahihi",
                };
            },
        },
        (torrent) => {
            console.log("torrent", torrent.infoHash);
        },
    );
}

seedFile();
