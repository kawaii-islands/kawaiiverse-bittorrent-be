const express = require('express');
const {body, validationResult, param} = require("express-validator");
const proxyEncryptionController = require("../controllers/proxy.encryption.controller");
const fileController = require("../controllers/file.controller");

const router = express.Router();

router.post('/v1/gen-key-proxy', [
        body('pk_share').notEmpty().isString().withMessage('pk_share empty'),
        body('cipher_aes').notEmpty().isObject().withMessage('cipher_aes empty'),
    ],
    proxyEncryptionController.genKeyProxy);

router.post('/v1/update-file',
    fileController.updateFile);
module.exports = router;
