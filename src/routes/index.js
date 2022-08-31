const express = require('express');
const {body, validationResult, param} = require("express-validator");
const proxyEncryptionController = require("../controllers/proxy.encryption.controller");
const fileController = require("../controllers/file.controller");
const seedFileController = require("../controllers/seed.file.controller");

const router = express.Router();

// router.post('/v1/gen-key-proxy', [
//         body('pk_share').notEmpty().isString().withMessage('pk_share empty'),
//         body('cipher_aes').notEmpty().isObject().withMessage('cipher_aes empty'),
//     ],
//     proxyEncryptionController.genKeyProxy);
//
//
// router.post('/v1/gen-encryption', [
//         body('rk').notEmpty().isString().withMessage('rk empty'),
//         body('obj').notEmpty().isObject().withMessage('obj empty'),
//     ],
//     proxyEncryptionController.genEncryption);

router.post('/v1/update-google-storage',
    fileController.updateFile);

router.post('/v1/request-seed', [
    body('magnet_url').notEmpty().isString().withMessage('magnet empty'),
], seedFileController.seedFile);

router.post('/v1/request-seed-server-to-server', [
    body('magnet_url').notEmpty().isString().withMessage('magnet empty'),
], seedFileController.seedFileServerToServer);

router.post('/v1/request-seed-backup', [
    body('magnet_url').notEmpty().isString().withMessage('magnet empty'),
], seedFileController.seedBackup);

router.post('/v1/upload-to-google-cloud'
    , fileController.updateFileToGoogleCloud);
module.exports = router;

