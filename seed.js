// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var newProject = {name: "Black Magic",
  dateCreated: "last week",
  description: "witch jumps on bats",
  technologies: ["jQuery", "CSS", "HTML"],
  deploymentSite: "http://black-magic.bitballoon.com",
  screenshot: "none"
  }

db.Project.create(newProject, function(err, project){
  if (err){
    return console.log("Error:", err);
  }

  console.log("Created new project", project._id)
  process.exit(); // we're all done! Exit the program.
})
