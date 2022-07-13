const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
    hashFile: {type: String},
    name: {type: String},
    magnetId: {type: String},
    typeFile: {type: String},
    createAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model("file", Schema);
