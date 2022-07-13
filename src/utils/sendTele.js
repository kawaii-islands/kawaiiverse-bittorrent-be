const axios = require('axios');

module.exports = {
    sendNoti: async (content) => {
        try {
            await axios.get("https://api.telegram.org/bot5505326307:AAHsPzXDUv13C7l7Y0NKS0llPsFSUmrIEgU/sendMessage?chat_id=-775673417&text=" + encodeURIComponent(content));
        } catch (e) {
        }
    },
};
