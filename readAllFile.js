const path = require('path');
const fs = require('fs');
//joining path of directory
const directoryPath = path.join(__dirname, 'src/storage');
console.log("directoryPath", directoryPath);
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the google-storage
        console.log(file);
    });
});
