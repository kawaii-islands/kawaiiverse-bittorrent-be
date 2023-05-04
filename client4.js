import parseTorrent from 'parse-torrent'


async function run(){
    parseTorrent.remote("https://node1-gateway-ipfs.eueno.io/ipfs/QmRwh7TCoxMKe2cgCEYJskLW3zRSAoA3YjPdRG7Vpcj4wz", { timeout: 60 * 1000 }, (err, parsedTorrent) => {
        if (err) throw err
        console.log(parsedTorrent)
    })
}
run()

// import url from 'url';
// const { hostname, port, protocol, auth, path } = url.parse("https://data.eueno.io/0x713ed4826cce211524b299eb22fcfc9778d9b079/Comics/encrypt/T%C3%B4i%20V%C3%B4%20T%C3%ACnh%20C%E1%BB%A9u%20%C4%90%C6%B0%E1%BB%A3c%20Em%20Trai%20Nam%20Ch%C3%ADnh/Chapter%201/1672943550003-tpp1dbgeti.T%C3%B4i%20V%C3%B4%20T%C3%ACnh%20C%E1%BB%A9u%20%C4%90%C6%B0%E1%BB%A3c%20Em%20Trai%20Nam%20Ch%C3%ADnh%20chap%201%20%20Trang%2028.jpg")
//
// console.log(url);
