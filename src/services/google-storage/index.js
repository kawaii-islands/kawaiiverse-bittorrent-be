const bucketName = 'storage.kawaii.global';
const {Storage} = require('@google-cloud/storage');
const path = require("path");
const appDir = path.dirname(require.main.filename);
module.exports = {
    uploadFile: async (url_file, name) => {
        try {
            const filePath = url_file;
            const nameSave = name;
            const storage = new Storage({keyFilename: `${appDir}/key/kawaii-studio-google-storage.json`});

            async function uploadFile() {
                await storage.bucket(bucketName).upload(filePath, {
                    destination: nameSave,
                });

                console.log(`${filePath} uploaded to ${bucketName}`);
            }

            uploadFile().catch(console.error);
            return null;
        } catch (e) {
            console.log("e-google storage", e);
            return e;
        }
    },
};
