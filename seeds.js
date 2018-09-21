var mongoose = require("mongoose"),
    Appdata = require("./models/appdata"),
    fs = require("fs"),
    fastcsv = require("fast-csv");

var stream = fs.createReadStream("E:/Workspace/My Projects/NewsBulletin/V2/input.csv");

function seedDB() {
    //Remove all the data in case there is some existing data in the current database
    Appdata.deleteMany({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("Cleared all the data from the database.");

        //Read in the data from the csv input file row by row
        fastcsv.fromStream(stream, { headers: true })
            .on("data", function (data) {
                //To remove the backslash characters from the publisher field in the input data
                data.publisher = data.publisher.replace(/\\/g, "");
                addToCollection(data);
            })
            .on("end", function () {
                console.log("Successfully added data to the database.");
            });

        function addToCollection(data) {
            //Create a model and save to the database
            var appData = new Appdata(data);
            appData.save(function (err) {
                if (err) {
                    console.log(err);
                }
            });
        }
    });
};

module.exports = seedDB;