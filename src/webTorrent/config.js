const WebTorrent = require("webtorrent-hybrid");

module.exports = {
    client: async () => {
        const client = new WebTorrent();
        return client;
    },
};
