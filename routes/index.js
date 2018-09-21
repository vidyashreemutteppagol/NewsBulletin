var express = require("express"),
    router = express.Router(),
    Appdata = require("../models/appdata");

//Root Route
router.get("/", function (req, res) {
    var perPage = 8;
    var pageQuery = parseInt(req.query.page);
    var pageNumber = pageQuery ? pageQuery : 1;

    //Get news data from the database according to the limits specified in the query
    Appdata.find({}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allAppdata) {
        Appdata.countDocuments().exec(function (err, count) {
            if (err) {
                console.log(err);
            } else {
                res.render("landing", {
                    newsdata: allAppdata,
                    current: pageNumber,
                    pages: Math.ceil(count / perPage)
                });
            }
        });
    });
});

module.exports = router;