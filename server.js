// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    message: "Welcome to my personal api! Here's all the fun info you need to know about me!",
    documentationUrl: "https://github.com/aquoss/express-personal-api/blob/master/README.md",
    baseUrl: "https://personal-api-aquoss.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"},
      // {method: "GET", path: "/api/dives", description: "Data about dives I've done"},
      // {method: "POST", path: "/api/dives", description: "Creates a new dive entry"},
      {method: "GET", path: "/api/projects", descrition: "Data about projects I've completed"},
      {method: "POST", path: "/api/projects", description: "Creates a new project entry"}
    ]
  })
});

app.get('/api/profile', function(req, res) {
  // var awake;
  // var hour = Date.now()/(3.6*Math.pow(10,6));
  // if (hour<8 || hour>23) {
  //   awake = false;
  // } else {
  //   awake = true;
  // }
  res.json({
    name: "Amber Quoss",
    githubUsername: "aquoss",
    githubLink: "https://github.com/aquoss",
    githubProfileImage: "https://avatars0.githubusercontent.com/u/23706621?v=3&u=f03253789f60a754707b8e989678385df46b59dd&s=400",
    personalSiteLink: "https://aquoss.github.io",
    currentCity: "San Francsico",
    // sleeping: awake,
    favoriteColor: "turquoise",
    enjoy: ["ballet", "scuba diving", "sarcasm", "mind-bending movies", "spontaneity", "live music", "pretending like I can sing", "eating in bed"],
    favoriteMovies: [{title: "Inception", director: "Christopher Nolan",
      stars: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
      description: "A thief, who steals corporate secrets through use of dream-sharing technology, is given the inverse task of planting an idea into the mind of a CEO."},
      {title: "Prisoners", director: "Denis Villeneuve", stars: ["Hugh Jackman", "Jake Gyllenhaal", "Viola Davis"],
      description: "When Keller Dover's daughter and her friend go missing, he takes matters into his own hands as the police pursue multiple leads and the pressure mounts."},
      {title: "Short Term 12", director: "Destin Cretton", stars: ["Brie Larson", "Frantz Turner", "John Gallagher Jr."],
      description: "A 20-something supervising staff member of a residential treatment facility navigates the troubled waters of that world alongside her co-worker and longtime boyfriend."},
      {title: "Arrival", director: "Denis Villeneuve", stars: ["Amy Adams", "Jeremy Renner", "Forest Whitaker"],
      description: "A linguist is recruited by the military to assist in translating alien communications."}]
  })
});

//get all projects
app.get('/api/projects', function(req, res) {
  //send all projects as json response
  db.Project.find({}, function(err, projects) {
    if (err) {
      res.status(500).send('server error');
      return console.log("index error: " + err);
    }
    res.json(projects);
  })
})

//get project by ID
app.get('/api/projects/:id', function (req, res) {
  //get project by id from url params
  db.Project.findOne({_id: req.params.id}, function (err, foundProject){
    if (err){
      res.status(500).send('database error');
      return console.log('error: ' + err);
    }
    res.json(foundProject);
  })
})

//create new project
app.post('/api/projects', function (req, res) {
  //create new project with form data
  var newProject = new db.Project(req.body);
  //save newProject to database
  newProject.save(function(err, project) {
    if (err) {
      res.status(500).send('database error');
      return console.log("save error: " + err);
    }
    res.json(project);
  })
})

//delete project
app.delete('/api/projects/:id', function (req, res) {
  //get project by id from url params
  db.Project.findOneAndRemove({_id: req.params.id}, function (err, deletedProject) {
    if (err) {
      res.status(500).send('database error');
      return console.log("deletion error: " + err);
    }
    res.json(deletedProject);
  })
})

//update project
app.patch('/api/projects/:id', function (req, res) {
  //get project by id from url params
  db.Project.findOne({_id: req.params.id}, function (err, updatedProject){
    if (err){
      res.status(500).send('update error');
      return console.log('update error: ' + err);
    }
    //update project data
    updatedProject.name = req.body.name || updatedProject.name;
    updatedProject.dateCreated = req.body.dateCreated || updatedProject.dateCreated;
    updatedProject.description = req.body.description || updatedProject.description;
    updatedProject.technologies = req.body.technologies || updatedProject.technologies;
    updatedProject.deploymentSite = req.body.deploymentSite || updatedProject.deploymentSite;
    updatedProject.screenshot = req.body.screenshot || updatedProject.screenshot;
    //save updates
    updatedProject.save(function(err, savedProject){
      if (err){
        res.status(500).send('database error');
        return console.log('save error: ' + err);
      }
      //send saved data
      res.json(savedProject);
    })
  })
})

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
