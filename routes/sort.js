var express = require("express"),
    router = express.Router(),
    Appdata = require("../models/appdata");

var perPage = 8;

//Sort by Publisher Route
router.get("/sortbypublisher", function(req, res){
    var pageQuerySort = parseInt(req.query.page);
    var pageNumberSort = pageQuerySort ? pageQuerySort : 1;

    Appdata.find({}).sort({publisher: 1}).skip((perPage * pageNumberSort) - perPage).limit(perPage).exec(function (err, allAppdata) {
        if(err){
            console.log(err);
        } else{
            Appdata.countDocuments().exec(function (err, count) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("sortbypublisher", {
                        newsdata: allAppdata,
                        current: pageNumberSort,
                        pages: Math.ceil(count / perPage)
                    });
                }
            });
        }
    });
});

//Sort by Title
router.get("/sortbytitle", function(req, res){
    var pageQuerySort = parseInt(req.query.page);
    var pageNumberSort = pageQuerySort ? pageQuerySort : 1;

    Appdata.find({}).sort({articleTitle: 1}).skip((perPage * pageNumberSort) - perPage).limit(perPage).exec(function (err, allAppdata) {
        if(err){
            console.log(err);
        } else{
            Appdata.countDocuments().exec(function (err, count) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("sortbytitle", {
                        newsdata: allAppdata,
                        current: pageNumberSort,
                        pages: Math.ceil(count / perPage)
                    });
                }
            });
        }
    });
})

module.exports = router;