import DHT from 'bittorrent-dht';
import magnet from 'magnet-uri';
import KBucket from 'k-bucket';

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

async function run() {

    const uri = 'magnet:?xt=urn:btih:373545d14a14c217fe6151b0eb6e67bea4410444';
    const parsed = magnet(uri);

    console.log(parsed.infoHash); // 'e3811b9539cacff680e418124272177c47477157'

    const dht = new DHT();
    dht.addNode({
        host: "127.0.0.1",
        port: 57971,
    });
    dht.addNode({
        host: "127.0.0.1",
        port: 55959,
    });

    let localNodeId = toBuffer(parsed.infoHash);

    dht.addData(localNodeId, {
        name: "canhtuan",
    });
    console.log("dht-----",dht._tables.cache["373545d14a14c217fe6151b0eb6e67bea4410444"].value.root)
    var interval_obj = setInterval(function () {
        console.log("interval");
        dht.lookup(parsed.infoHash, (err, data) => {
            console.log("err", err);
            console.log("data", data);
            // console.log("dht-----",dht._tables);
            console.log("dht-----", dht._tables.cache["373545d14a14c217fe6151b0eb6e67bea4410444"].value.root);
        });

    }, 10000);


    // await sleep(5000);
    // const nodes = dht.toJSON().nodes;
    // console.log("nodes--", nodes);

    // dht.announce("373545d14a14c217fe6151b0eb6e67bea4410444", 20001, (error, data) => {
    //     console.log("error", error);
    //     console.log(data);
    //     dht.get("373545d14a14c217fe6151b0eb6e67bea4410444", {}, (err, res) => {
    //         console.log("get");
    //         console.log("err", err);
    //         console.log("datadata", res);
    //     });
    //
    // });

    // dht.on('peer', function (peer, infoHash, from) {
    //     console.log('found potential peer ' + peer.host + ':' + peer.port + ' through ' + from.address + ':' + from.port)
    // })

    // dht.listen(20000, function () {
    //     console.log('now listening');
    // });
    // console.log(dht);
//     dht.on('peer', function (peer, infoHash, from) {
//         console.log('found potential peer ' + peer.host + ':' + peer.port + ' through ' + from.address + ':' + from.port);
//     });
//
// // find peers for the given torrent info hash
//     dht.lookup(parsed.infoHash);
}

function toBuffer(str) {
    if (Buffer.isBuffer(str)) return str;
    if (ArrayBuffer.isView(str)) return Buffer.from(str.buffer, str.byteOffset, str.byteLength);
    if (typeof str === 'string') return Buffer.from(str, 'hex');
    throw new Error('Pass a buffer or a string');
}

run();
