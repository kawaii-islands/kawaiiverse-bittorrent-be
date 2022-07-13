const express = require('express');
const {body, validationResult, param} = require("express-validator");
const proxyEncryptionController = require("../controllers/proxy.encryption.controller");
const fileController = require("../controllers/file.controller");

const router = express.Router();

router.post('/v1/gen-key-proxy', [
        body('key').notEmpty().isString().withMessage('key empty'),
        body('cipher').notEmpty().isString().withMessage('cipher empty'),
    ],
    proxyEncryptionController.genKeyProxy);

router.post('/v1/update-file',
    fileController.updateFile);
module.exports = router;
