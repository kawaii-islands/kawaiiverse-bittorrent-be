// import {hexToBytes} from '@noble/hashes/utils';
// import { bytesToHex } from '@noble/hashes/utils';
// import { blake2b } from '@noble/hashes/blake2b';
// import nacl from 'tweetnacl';
//
// function b64ToUint6(nChr) {
//     return nChr > 64 && nChr < 91
//         ? nChr - 65
//         : nChr > 96 && nChr < 123
//             ? nChr - 71
//             : nChr > 47 && nChr < 58
//                 ? nChr + 4
//                 : nChr === 43
//                     ? 62
//                     : nChr === 47
//                         ? 63
//                         : 0;
// }
//
// export function fromB64(sBase64, nBlocksSize) {
//     var sB64Enc = sBase64.replace(/[^A-Za-z0-9+/]/g, ''),
//         nInLen = sB64Enc.length,
//         nOutLen = nBlocksSize
//             ? Math.ceil(((nInLen * 3 + 1) >> 2) / nBlocksSize) * nBlocksSize
//             : (nInLen * 3 + 1) >> 2,
//         taBytes = new Uint8Array(nOutLen);
//
//     for (
//         var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0;
//         nInIdx < nInLen;
//         nInIdx++
//     ) {
//         nMod4 = nInIdx & 3;
//         nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << (6 * (3 - nMod4));
//         if (nMod4 === 3 || nInLen - nInIdx === 1) {
//             for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
//                 taBytes[nOutIdx] = (nUint24 >>> ((16 >>> nMod3) & 24)) & 255;
//             }
//             nUint24 = 0;
//         }
//     }
//
//     return taBytes;
// }
//
// /* Base64 string to array encoding */
//
// function uint6ToB64(nUint6) {
//     return nUint6 < 26
//         ? nUint6 + 65
//         : nUint6 < 52
//             ? nUint6 + 71
//             : nUint6 < 62
//                 ? nUint6 - 4
//                 : nUint6 === 62
//                     ? 43
//                     : nUint6 === 63
//                         ? 47
//                         : 65;
// }
//
// export function toB64(aBytes) {
//     var nMod3 = 2,
//         sB64Enc = '';
//
//     for (var nLen = aBytes.length, nUint24 = 0, nIdx = 0; nIdx < nLen; nIdx++) {
//         nMod3 = nIdx % 3;
//         if (nIdx > 0 && ((nIdx * 4) / 3) % 76 === 0) {
//             sB64Enc += '';
//         }
//         nUint24 |= aBytes[nIdx] << ((16 >>> nMod3) & 24);
//         if (nMod3 === 2 || aBytes.length - nIdx === 1) {
//             sB64Enc += String.fromCodePoint(
//                 uint6ToB64((nUint24 >>> 18) & 63),
//                 uint6ToB64((nUint24 >>> 12) & 63),
//                 uint6ToB64((nUint24 >>> 6) & 63),
//                 uint6ToB64(nUint24 & 63)
//             );
//             nUint24 = 0;
//         }
//     }
//
//     return (
//         sB64Enc.slice(0, sB64Enc.length - 2 + nMod3) +
//         (nMod3 === 2 ? '' : nMod3 === 1 ? '=' : '==')
//     );
// }
//
//
// function fromSecretKey(secretKey) {
//     const secretKeyLength = secretKey.length;
//     if (secretKeyLength !== 32) {
//         throw new Error(
//             `Wrong secretKey size. Expected ${32} bytes, got ${secretKeyLength}.`,
//         );
//     }
//     return nacl.sign.keyPair.fromSeed(secretKey);
// }
//
// export const SIGNATURE_SCHEME_TO_FLAG = {
//     ED25519: 0x00,
//     Secp256k1: 0x01,
// };
//
// function normalizeSuiAddress(
//     value,
// ) {
//     let forceAdd0x = false;
//     let address = value.toLowerCase();
//     if (!forceAdd0x && address.startsWith('0x')) {
//         address = address.slice(2);
//     }
//     return `0x${address.padStart(32 * 2, '0')}`;
// }
//
// function toSuiAddress(data) {
//     let tmp = new Uint8Array(32 + 1);
//     tmp.set([SIGNATURE_SCHEME_TO_FLAG['ED25519']]);
//     tmp.set(data, 1);
//     // Each hex char represents half a byte, hence hex address doubles the length
//     return normalizeSuiAddress(
//         bytesToHex(blake2b(tmp, {dkLen: 32})).slice(0, 32 * 2),
//     );
// }

// const keyPair = {
//     schema: 'ED25519',
//     privateKey: toB64(hexToBytes("2dae0f7d166f000993242e6d3696b6595c1ae3e3c2eea732fa1e789e8e063d14")),
// };

// const secretKey = fromB64(keyPair.privateKey);
// let pureSecretKey = secretKey;
// if (secretKey.length === 64) {
//     pureSecretKey = secretKey.slice(0, 32);
// }
// const keypairToImport = fromSecretKey(pureSecretKey);
//
// const importedAddress = toSuiAddress(keypairToImport.publicKey);
// console.log(importedAddress)


import {
    Ed25519Keypair,
    JsonRpcProvider,
    RawSigner,
    TransactionBlock,
} from '@mysten/sui.js';
// Generate a new Ed25519 Keypair

const TEST_MNEMONICS = 'budget music violin cycle prison jewel core drastic route upper birth hidden';
// Create a keypair under Ed25519 scheme.
const keypair_ed25519 = Ed25519Keypair.deriveKeypair(TEST_MNEMONICS, "m/44'/784'/0'/0'/0'");
console.log("keypair_ed25519",keypair_ed25519);
const signer = new RawSigner(
    keypair_ed25519, // or use keypair_secp256k1 for ECDSA secp256k1
    new JsonRpcProvider('https://wallet-rpc.testnet.sui.io')
);
console.log("signer",signer);

// const tx = new TransactionBlock();
// tx.transferObjects(
//     [tx.object('0xe19739da1a701eadc21683c5b127e62b553e833e8a15a4f292f4f48b4afea3f2')],
//     tx.pure('0x1d20dcdb2bca4f508ea9613994683eb4e76e9c4ed371169677c1be02aaf0b12a'),
// );
// const result = await signer.signAndExecuteTransactionBlock({ transactioginBlock: tx });
// console.log({ result });
