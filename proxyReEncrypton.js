const Recrypt = require("@ironcorelabs/recrypt-node-binding");

var msg = "Hello";

var args = process.argv;
if (args.length>2) msg=args[2];

const Api256 = new Recrypt.Api256();

const aliceKeys = Api256.generateKeyPair();
const aliceSigningKeys = Api256.generateEd25519KeyPair();


const plaintext = Buffer.alloc(384,null)
plaintext.write(msg,'ascii')

// Encrypt with public key, and decrypt with the private key
const ciphertext = Api256.encrypt(plaintext, aliceKeys.publicKey, aliceSigningKeys.privateKey);


const bobKeys = Api256.generateKeyPair();

//Use Alice's private key, and Bob's public key to transform
const userToDeviceTransformKey = Api256.generateTransformKey(aliceKeys.privateKey, bobKeys.publicKey, aliceSigningKeys.privateKey);

// Re-encrypt for Bob and sign with Alice's private key
const transformedEncryptedValue = Api256.transform(ciphertext, userToDeviceTransformKey, aliceSigningKeys.privateKey);

//Decrypt with Bob's private key
var plain = Api256.decrypt(transformedEncryptedValue, bobKeys.privateKey);


pl= plain.toString();
pl=pl.substr(0,pl.indexOf('\0')); // Remove nulls

console.log("\nAlice Private key: ",aliceKeys.privateKey.toString('hex'));
console.log("Alice Public key: ",aliceKeys.publicKey.x.toString('hex'),aliceKeys.publicKey.y.toString('hex'));
console.log("Bob Private key: ",bobKeys.privateKey.toString('hex'));
console.log("Bob Public key: ",bobKeys.publicKey.x.toString('hex'),bobKeys.publicKey.y.toString('hex'));

console.log("\nPlaintext value: ",msg)

console.log("Ciphertext value: ",ciphertext.encryptedMessage.toString('hex'))
console.log("Decrypted value: ",pl)
