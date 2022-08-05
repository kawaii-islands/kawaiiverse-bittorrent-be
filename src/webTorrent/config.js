const WebTorrent = require("webtorrent-hybrid");

module.exports = {
    client: async () => {
        const client = new WebTorrent();
        return client;
    },
    requiredOpts: () => {
        return {
            announce: ["ws://tracker.kawaii.global"], // list of tracker server urls
            dht: false,
        };
    },
};
