const bucketName = 'storage.kawaii.global';
const {Storage} = require('@google-cloud/storage');
const path = require("path");
const appDir = path.dirname(require.main.filename);
const storage = new Storage({keyFilename: `${appDir}/key/kawaii-studio-google-storage.json`});
module.exports = {
    uploadFile: async (url_file, name) => {
        try {
            const filePath = url_file;
            const nameSave = name;

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
    uploadFileByContent: async (contents, name) => {
        try {

            async function uploadFromMemory() {
                await storage.bucket(bucketName).file(name).save(contents);

                console.log(
                    `${name} with contents ${contents} uploaded to ${bucketName}.`,
                );
            }

            uploadFromMemory().catch(console.error);
        } catch (e) {
            console.log("e-google storage", e);
            return e;
        }
    },
};
