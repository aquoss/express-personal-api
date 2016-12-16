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

// var db = require('./models');

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
      {method: "GET", path: "/api/dives", description: "Data about dives I've done"},
      {method: "POST", path: "/api/dives", description: "Creates a new dive entry"},
      {method: "GET", path: "/api/projects", descrition: "Data about projects I've completed"},
      {method: "POST", path: "/api/projects", description: "Creates a new project entry"}
    ]
  })
});

app.get('/api/profile', function(req, res) {
  res.json({
    name: "Amber Quoss",
    githubUsername: "aquoss",
    githubLink: "https://github.com/aquoss",
    githubProfileImage: "https://avatars0.githubusercontent.com/u/23706621?v=3&u=f03253789f60a754707b8e989678385df46b59dd&s=400",
    personalSiteLink: "https://aquoss.github.io",
    currentCity: "San Francsico",
    favoriteColor: "turquoise",
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

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
