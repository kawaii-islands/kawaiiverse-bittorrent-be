import LSD from 'bittorrent-lsd';

async function run() {
    const opts = {
        peerId: "2d5757303130392d664974732b64434166436176", // hex string or Buffer
        infoHash: "c5489a950cbbc8639b10313263bd60378e6b8cdf", // hex string or Buffer
        port: 1000, // torrent client port
    };
    const lsd = new LSD(opts);

// start getting peers from local network
    lsd.start();

    lsd.on('peer', (peerAddress, infoHash) => {
        console.log('found a peer: ' + peerAddress);
        console.log('found a infoHash: ' + infoHash);
    });


    // lsd.destroy()
}

run();
