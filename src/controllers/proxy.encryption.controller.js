const {validationResult} = require('express-validator');
const WebTorrent = require("webtorrent");
const jsSdk = require('recrypt-js');

const keySystem = require("../key/key.json");

module.exports = {
    genKeyProxy: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let error = errors.errors;
                return res.status(200).send({status: 500, error});
            }

            let reqData = req.body;
            let decode = jsSdk.decryptData(keySystem.sk, reqData);

            let rk = jsSdk.generateReEncrytionKey(keySystem.sk, pk_B);
            jsSdk.reEncryption(rk, obj)
            console.log("decode", decode);

        } catch (e) {
            console.log(e);
        }
    },
};
