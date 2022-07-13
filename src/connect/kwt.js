require('dotenv').config();
const Web3 = require('web3');

module.exports = ({
    web3: () => {
        return new Web3(new Web3.providers.HttpProvider(process.env.END_POINT_KWT));
    },
});
