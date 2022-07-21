const WebTorrent = require("webtorrent-hybrid");

module.exports = {
    client: async () => {
        return new WebTorrent();
    },
};
