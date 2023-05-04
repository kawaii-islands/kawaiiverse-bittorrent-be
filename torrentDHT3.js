import DHT from 'bittorrent-dht'
const dht = new DHT()

let value = Buffer.from("canhtuan", 'utf-8');
value.name = "canhtuan.txt";

dht.put({ v: value }, function (err, hash) {
    console.error('error=', err)
    console.log('hash=', hash)
    dht.get(hash, function (err, res) {
        console.log("err",err);
        console.log("res",res);
    })
})
