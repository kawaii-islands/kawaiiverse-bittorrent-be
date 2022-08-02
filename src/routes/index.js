const express = require('express');
const {body, validationResult, param} = require("express-validator");
const proxyEncryptionController = require("../controllers/proxy.encryption.controller");
const fileController = require("../controllers/file.controller");
const seedFileController = require("../controllers/seed.file.controller");

const router = express.Router();

router.post('/v1/gen-key-proxy', [
        body('pk_share').notEmpty().isString().withMessage('pk_share empty'),
        body('cipher_aes').notEmpty().isObject().withMessage('cipher_aes empty'),
    ],
    proxyEncryptionController.genKeyProxy);


router.post('/v1/gen-encryption', [
        body('rk').notEmpty().isString().withMessage('rk empty'),
        body('obj').notEmpty().isObject().withMessage('obj empty'),
    ],
    proxyEncryptionController.genEncryption);

router.post('/v1/update-file',
    fileController.updateFile);

router.post('/v1/request-seed', [
    body('magnet_url').notEmpty().isString().withMessage('magnet empty'),
], seedFileController.seedFile);

module.exports = router;

