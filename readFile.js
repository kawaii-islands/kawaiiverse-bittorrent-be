const {Storage} = require('@google-cloud/storage');

// Creates a client
const storage = new Storage({keyFilename: "src/key/kawaii-studio-google-storage.json"});

async function listFiles() {
    // Lists files in the bucket
    const [files] = await storage.bucket("storage.kawaii.global").getFiles();

    console.log('Files:');
    files.forEach(file => {
        console.log(file.name);
    });
}

listFiles().catch(console.error);
