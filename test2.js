
const jsSdk = require("recrypt-js")
// const Proxy = require("./index").Proxy;
// const PRE = require("./index");

function test() {
    var kp_A = jsSdk.Proxy.generate_key_pair();
    var sk_A = jsSdk.Proxy.to_hex(kp_A.get_private_key().to_bytes());
    var pk_A = jsSdk.Proxy.to_hex(kp_A.get_public_key().to_bytes());

    var kp_B = jsSdk.Proxy.generate_key_pair();
    var sk_B = jsSdk.Proxy.to_hex(kp_B.get_private_key().to_bytes());
    var pk_B = jsSdk.Proxy.to_hex(kp_B.get_public_key().to_bytes());

    let obj = jsSdk.encryptData(pk_A, "test data ahihi")
    console.log(obj)
    let rk = jsSdk.generateReEncrytionKey(sk_A, pk_B);
    jsSdk.reEncryption(rk, obj)

    let decryptData = jsSdk.decryptData(sk_B, obj)
    console.log(decryptData)
}
test()
