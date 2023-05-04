import DHT from 'bittorrent-dht';
import magnet from 'magnet-uri';

async function run() {

    const uri = 'magnet:?xt=urn:btih:373545d14a14c217fe6151b0eb6e67bea4410444';
    const parsed = magnet(uri);

    console.log(parsed.infoHash); // 'e3811b9539cacff680e418124272177c47477157'

    const dht = new DHT();

    dht.listen(20001, function () {
        console.log('now listening');
    });
    // dht.announce("373545d14a14c217fe6151b0eb6e67bea4410444", 0, (error, data) => {
    //     console.log("error", error);
    //     console.log(data);
    //     dht.get("373545d14a14c217fe6151b0eb6e67bea4410444", {}, (err, data) => {
    //         console.log("get err", err);
    //         console.log("get", data);
    //     });
    // });

    dht.on('announce', function (peer, infoHash) {
        console.log("peer", peer);
        console.log("infoHash", infoHash);
    });

}

run();
