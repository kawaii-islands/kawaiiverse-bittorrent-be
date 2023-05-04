// import Eueno from "eueno-library";
// import fs from "fs";
const fs = require('fs');
const Eueno = require('@eueno/lib-node');

async function run() {
    const eueno = new Eueno({
        endpoint: 'https://v2-developers.eueno.io',
    });
    console.log(eueno);
    const file = await fs.readFileSync('/Users/admin/Desktop/This-pc/bft_goc.jpeg');

    const data = await eueno.upload(
        file,
        {
            projectKey: '0a1a053a5fc57b4a93d55bc885df9b196e05453a5b4a58256908e0056699876d',
            key: {
                publicKey:
                    '0483e5c513a622e67ff186671993a9969ad1e33814109a905d41a492852f26fb1c1d67b35a878299a07cb2e9eed473ea09b127d73373aaac77fc84e0852684e37e',
                k: '88R_EVRlWRff8gK5ycb8ApxmAmo8PzTNrWAjOZaguYw',
            },
        },
        {
            projectId: 2,
            filename: '1.png',
            contentLength: 329359,
            contentType: 'image/png',
            method: 'ENCRYPT',
            keepPath: false,
        },
    );
    console.log(data);
    return;

}

run();
