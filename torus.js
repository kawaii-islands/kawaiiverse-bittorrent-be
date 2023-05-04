const { Web3Auth } = require("@web3auth/node-sdk");

const web3auth = new Web3Auth({
    clientId: "WEB3AUTH_CLIENT_ID", // Get your Client ID from Web3Auth Dashboard
    chainConfig: {
        chainNamespace: "eip155",
        chainId: "0x1",
        rpcTarget: "https://rpc.ankr.com/eth", // needed for non-other chains
    },
});

web3auth.init({ network: "testnet" });

const connect = async () => {
    const provider = await web3auth.connect({
        verifier: "verifier-name", // replace with your verifier name, and it has to be on the same network passed in init().
        verifierId: "verifier-Id", // replace with your verifier id(sub or email), setup while creating the verifier on Web3Auth's Dashboard
        idToken: "JWT Token", // replace with your newly created unused JWT Token.
    });
    const privateKey = await provider.request({ method: "eth_private_key" });
    console.log("ETH Private Key", privateKey);
};
connect();
