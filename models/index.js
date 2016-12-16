//require mongoose
var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/personal-api");

//export models
module.exports.Project = require('./project.js');
