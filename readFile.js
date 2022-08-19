const {Storage} = require('@google-cloud/storage');
const {promises: fs1} = require('fs');

// Creates a client
const storage = new Storage({keyFilename: "src/key/kawaii-studio-google-storage.json"});

async function listFiles() {
    // Lists files in the bucket
    const [files] = await storage.bucket("storage.kawaii.global").getFiles();

    console.log('Files:',files[0].storage);
    // files.forEach(file => {
    //     console.log(file);
    // });
}

listFiles().catch(console.error);
