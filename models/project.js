//require mongoose
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

//create project schema
var ProjectSchema = new Schema({
  name: String,
  lastUpload: Date,
  description: String,
  technologies: Array,
  deploymentSite: String,
  screenshot: String
});

//create model from schema
var Project = mongoose.model('Project', ProjectSchema);

//export
module.exports = Project;
