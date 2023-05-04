import Tracker from "bittorrent-tracker";

const client = new Tracker({
    peerId: "2d5757303130392d664974732b64434166436176",
    infoHash: "%B1%95%C7%88N%3A%0Fec%DB%03%11%9A%F6%05%40%F6%29v%1E",
    announce: ["http://localhost:8000/announce"],
    port: "3000",
});

async function run(){
    client.scrape({
        announce: ["http://localhost:8000/announce"],
        infoHash: ["b195c7884e3a0f6563db03119af60540f629761e"],
    }, function (err, results) {
        console.log("err",err);
        console.log("results",results);
        // results[infoHash1].announce;
        // results[infoHash1].infoHash;
        // results[infoHash1].complete;
        // results[infoHash1].incomplete;
        // results[infoHash1].downloaded;

    });
}
run()

