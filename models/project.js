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
  screenshot: { data: Buffer, contentType: String }
});

//create model from schema
var Project = mongoose.model('Project', ProjectSchema);

//export
module.exports = Project;
