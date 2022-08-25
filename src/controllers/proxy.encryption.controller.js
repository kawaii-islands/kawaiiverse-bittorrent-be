// const {validationResult} = require('express-validator');
// const jsSdk = require('recrypt-js');
//
// const keySystem = require("../key/key.json");
//
// module.exports = {
//     genKeyProxy: async (req, res, next) => {
//         try {
//             const errors = validationResult(req);
//             if (!errors.isEmpty()) {
//                 let error = errors.errors;
//                 return res.status(200).send({status: 500, error});
//             }
//
//             let pkShare = req.body.pk_share;
//             let cipherAes = req.body.cipher_aes;
//
//             let rk = jsSdk.generateReEncrytionKey(keySystem.sk, pkShare);
//             jsSdk.reEncryption(rk, cipherAes);
//
//             return res.status(200).send({status: 200, cipher: cipherAes});
//
//         } catch (e) {
//             console.log(e);
//             return res.status(200).send({status: 500, msg: "internal server"});
//         }
//     },
//     genEncryption : async (req,res,next) =>{
//         try {
//             const errors = validationResult(req);
//             if (!errors.isEmpty()) {
//                 let error = errors.errors;
//                 return res.status(200).send({status: 500, error});
//             }
//             let rk = req.body.rk
//             let obj = req.body.obj
//
//
//
//             jsSdk.reEncryption(rk, obj);
//
//             return res.status(200).send({status: 200, obj});
//
//         }catch (e){
//             console.log(e);
//             return res.status(200).send({status: 500, msg: "internal server"});
//         }
//     }
// };
