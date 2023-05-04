import Protocol from 'bittorrent-protocol'
import net from 'net'
import ut_pex from 'ut_pex'

net.createServer(socket => {
    const wire = new Protocol()
    socket.pipe(wire).pipe(socket)

    // initialize the extension
    wire.use(ut_pex())

    // all `ut_pex` functionality can now be accessed at wire.ut_pex

    // (optional) start sending peer information to remote peer
    wire.ut_pex.start()

    // 'peer' event will fire for every new peer sent by the remote peer
    wire.ut_pex.on('peer', (peer, flags) => {
        // got a peer
        // probably add it to peer connections queue
    })

    // handle handshake
    wire.on('handshake', (infoHash, peerId) => {
        wire.handshake(new Buffer('my info hash'), new Buffer('my peer id'))
    })

    const peer = '192.168.1.46:61325'
    const flags = {
        prefersEncryption: false,
        isSender: true,
        supportsUtp: true,
        supportsUtHolepunch: false,
        isReachable: false
    }

    wire.ut_pex.addPeer(peer, flags)


}).listen(6881)
