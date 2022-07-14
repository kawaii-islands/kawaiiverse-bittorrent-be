const jsSdk = require("recrypt-js");
// const Proxy = require("./index").Proxy;
// const PRE = require("./index");

const keySystem = require("./src/key/key.json");
const keyBob = require("./src/key/bob.json");
const keyAlice = require("./src/key/alice.json");

function genKey() {
    var kp_A = jsSdk.Proxy.generate_key_pair();
    console.log("kp_A", kp_A);
    var sk_A = jsSdk.Proxy.to_hex(kp_A.get_private_key().to_bytes());
    var pk_A = jsSdk.Proxy.to_hex(kp_A.get_public_key().to_bytes());
    console.log("sk_A", sk_A);
    console.log("pk_a", pk_A);

    var kp_B = jsSdk.Proxy.generate_key_pair();
    var sk_B = jsSdk.Proxy.to_hex(kp_B.get_private_key().to_bytes());
    var pk_B = jsSdk.Proxy.to_hex(kp_B.get_public_key().to_bytes());

    console.log("sk_B", sk_B);
    console.log("pk_B", pk_B);

}

let keyAes = "11122233344455566677788822244455555555555555555231231321313aaaff";
const AesEncryption = require('aes-encryption');

async function test2() {

    const aes = new AesEncryption();
    aes.setSecretKey(keyAes);

    const encrypted = aes.encrypt('tâm sự của đá - tác giả : cuộc đời của Tuấn');
    console.log("encrypted", encrypted);

    // alice encode key aes
    let encodeKeyAes = jsSdk.encryptData(keySystem.pk, keyAes);
    console.log("encodeKeyAes", encodeKeyAes);

//     //alice encode chính private key của mình với khoá là khoá public của proxy
//     let encodeSkAlice = jsSdk.encryptData(keySystem.pk, keyAlice.sk);
//     console.log("encodeSkAlice", encodeSkAlice);

    //server proxy nhận data và giải mã lấy sk của alice

//     let decodeGetSkAlice = jsSdk.decryptData(keySystem.sk, encodeSkAlice);
//     console.log("decodeGetSkAlice", decodeGetSkAlice);

    let rk = jsSdk.generateReEncrytionKey(keySystem.sk, keyBob.pk);
    jsSdk.reEncryption(rk, encodeKeyAes);

    console.log("rk", rk);

    // bob decode get key aes
    let decryptData = jsSdk.decryptData(keyBob.sk, encodeKeyAes);
    console.log("decryptData", decryptData);
}

test2();

