const {validationResult} = require('express-validator');
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

            let keyEncode = req.body.key_encode;
            let cipher = req.body.cipher;
            let pkShare = req.body.pk_share;
            let cipherAes = req.body.cipher_aes;

            let decodeGetSkAlice = jsSdk.decryptData(keySystem.sk, {
                key: keyEncode,
                cipher: cipher,
            });

            let rk = jsSdk.generateReEncrytionKey(decodeGetSkAlice, pkShare);
            jsSdk.reEncryption(rk, cipherAes);

            return res.status(200).send({status: 200, cipher: cipherAes});

        } catch (e) {
            return res.status(200).send({status: 500, msg: "internal server"});
        }
    },
};
