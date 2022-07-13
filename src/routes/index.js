const express = require('express');
const {body, validationResult, param} = require("express-validator");
const proxyEncryptionController = require("../controllers/proxy.encryption.controller");
const fileController = require("../controllers/file.controller");

const router = express.Router();

router.post('/v1/gen-key-proxy', [
        body('private_key_owner').notEmpty().isString().withMessage('private_key_owner empty'),
        body('public_key_share').notEmpty().isString().withMessage('public_key_share empty'),
    ],
    proxyEncryptionController.genKeyProxy);

router.post('/v1/update-file',
    fileController.updateFile);
module.exports = router;
