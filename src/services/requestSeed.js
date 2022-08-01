const axios = require('axios');
const hostConts = require("../constants/host");

module.exports = {
    requestSeed: async (magnet_url) => {
        try {
            let data = JSON.stringify({
                magnet_url,
            });

            for (let i = 0; i < hostConts.host.length; i++) {
                let config = {
                    method: 'post',
                    url: `${hostConts.host[i]}/v1/request-seed`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: data,
                };
                try {
                    await axios(config);
                } catch (e) {
                    continue;
                }
            }
            return null;
        } catch (e) {
            return null;
        }
    },
};
