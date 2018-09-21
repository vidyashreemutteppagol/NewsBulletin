var bodyParser = require("body-parser"),
    express = require("express"),
    flash = require("connect-flash"),
    app = express(),
    mongoose = require("mongoose"),
    session = require("express-session");

//Requiring the seeds file
var seedDB = require("./seeds")

//Requiring Routes
var indexRoutes = require("./routes/index");
var sortRoutes = require("./routes/sort");

//Database Config
mongoose.connect("mongodb://localhost:27017/NewsBulletin_V2", {useNewUrlParser: true});

//Seeding the database
seedDB();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(flash());

//Express session config
app.use(session({
    secret: "Batman Rocks!",
    resave: false,
    saveUninitialized: false
}));

app.use(function(req, res, next){
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/sort", sortRoutes);

app.listen(3000, function(req, res){
    console.log("Server has been started and is running on port 3000.");
});