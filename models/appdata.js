var mongoose = require("mongoose");

//Schema set up for the app data
var appSchema = new mongoose.Schema({
    serialNo: Number,
    articleTitle: String,
    articleLink: String,
    publisher: String,
    type: String,
    publisherLink: String,
    articleNumber: Number
});

module.exports = mongoose.model("Appdata", appSchema);