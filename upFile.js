/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// The ID of your GCS bucket
const bucketName = 'storage.kawaii.global';

// The path to your google-storage to upload
const filePath = '/Users/admin/Desktop/This-pc/orai/kawaiiverse-bittorrent-be/file/photo_2022-08-13 00.26.49 copy 2.jpeg';

// The new ID for your GCS google-storage
const destFileName = 'file/photo_2022-08-13 00.26.49 copy 2.jpeg';

// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// Creates a client
const storage = new Storage({keyFilename: "src/key/kawaii-studio-google-storage.json"});

async function uploadFile() {
    await storage.bucket(bucketName).upload(filePath, {
        destination: destFileName,
    });

    console.log(`${filePath} uploaded to ${bucketName}`);
}

uploadFile().catch(console.error);
