//move data variables into back end and add more
//what does the profile do?
$(document).ready(function(){

  var profileKeys = ['currentCity','githubProfileImage','favoriteColor','favoriteMovies','enjoy'];
  var enjoyArr, favoriteMoviesArr;
  var message = {currentCity:'I currently live in ',
                githubProfileImage:"Oh hey look it's me!",
                favoriteColor:'My favorite color is ',
                favoriteMovies:'One of my favorite movies is: ',
                enjoy:'I quite thoroughly enjoy: '}

  //hide new project form on load
  $('#project-form').hide();

  //initial project load
  $.ajax({
    method: 'GET',
    url: 'https://personal-api-aquoss.herokuapp.com/api/projects',
    success: loadProjects,
    error: onError
  })

  $('#new-project').on('click', function(){
    $('#project-container').hide();
    $('#project-form').fadeIn(300);
    $('#view-all').removeClass('active').addClass('inactive');
    $('#new-project').removeClass('inactive').addClass('active');
  })

  $('#view-all').on('click', function(){
    $('#project-form').hide();
    $('#project-container').fadeIn(300);
    $('#view-all').removeClass('inactive').addClass('active');
    $('#new-project').removeClass('active').addClass('inactive');
  })

  $('#home').on('click', function(){
    $('#headingAddOn').css('opacity',1);
    $('header').css('height','auto');
  })

  //initialize data for tidbit generator
  $.ajax({
    method: 'GET',
    url: 'https://personal-api-aquoss.herokuapp.com/api/profile',
    success: function(response){
      enjoyArr = response.enjoy;
      favoriteMoviesArr = response.favoriteMovies;
    },
    error: onError
  })

  //event listener for tidbit button
  $('#tidbit').on('click', function(){
    //responds with all api data
    $.ajax({
      method: 'GET',
      url: 'https://personal-api-aquoss.herokuapp.com/api/profile',
      success: tidbitGenerator,
      error: onError
    })
  })

  //post new project data and append to project page
  $('form').on('submit', function(event){
    event.preventDefault();
    var projectData = $('form').serialize();
    console.log(projectData);
    $.ajax({
      method: 'POST',
      url: 'https://personal-api-aquoss.herokuapp.com/api/projects',
      data: projectData,
      success: newProject,
      error: onError
    })
  })

  $('#projects').on('click', function(){
    shortHeader();
  })


  // responds with profile data
  // $.ajax({
  //   method: 'GET',
  //   url: 'https://personal-api-aquoss.herokuapp.com/api/profile',
  //   success: onSuccess,
  //   error: onError
  //   })
  //
  // // responds with all projects
  // $.ajax({
  //   method: 'GET',
  //   url: 'https://personal-api-aquoss.herokuapp.com/api/projects',
  //   success: onSuccess,
  //   error: onError
  //   })
  //
  // // responds with one specific project
  // $.ajax({
  //   method: 'GET',
  //   url: 'https://personal-api-aquoss.herokuapp.com/api/projects/:id',
  //   success: onSuccess,
  //   error: onError
  //   })
  //
  // // creates a new project
  // $.ajax({
  //   method: 'POST',
  //   url: 'https://personal-api-aquoss.herokuapp.com/api/projects',
  //   success: onSuccess,
  //   error: onError
  //   })
  //
  // // deletes a project
  // $.ajax({
  //   method: 'DELETE',
  //   url: 'https://personal-api-aquoss.herokuapp.com/api/projects/:id',
  //   success: onSuccess,
  //   error: onError
  //   })
  //
  // // updates a project
  // $.ajax({
  //   method: 'PATCH',
  //   url: 'https://personal-api-aquoss.herokuapp.com/api/projects/:id',
  //   success: onSuccess,
  //   error: onError
  //   })

  function loadContact(response){

  }

  function loadProjects(response){
    var source = $('#project-template').html();
    var template = Handlebars.compile(source);
    response.forEach(function(object){
      var projectHtml = template({
        name: object.name,
        screenshot: object.screenshot
      })
      $('#project-container').append(projectHtml);
    })
  }

  function newProject(object){
    var source = $('#project-template').html();
    var template = Handlebars.compile(source);
    var projectHtml = template({
      name: object.name,
      screenshot: object.screenshot
    })
    $('#project-container').append(projectHtml);
    console.log(object);
  }

  //shorten header
  function shortHeader(){
    $('#headingAddOn').css('opacity',0);
    $('header').animate({height:'300px'},500);
  }

  function tidbitGenerator(response){
    //remove previous tidbit
    $('#data').html("");
    //check for repetition
    if (profileKeys.length === 0) {
      return $('#data').append("<p class='emphasize'>Uh oh! You've consumed all my tidbits!</p>");
    }
    //generate a random object key
    var objIndex = Math.floor(Math.random()*(profileKeys.length));
    //append tidbit
    if (profileKeys[objIndex] === 'enjoy') {
      var arrIndex = Math.floor(Math.random()*enjoyArr.length);
      $('#data').append('<p><span class="emphasize">' + message.enjoy + '</span><br>' + enjoyArr[arrIndex] + '</p>');
      enjoyArr.splice(arrIndex,1);
      //remove appended item to clear repetition
      if (enjoyArr.length === 0) {
        profileKeys.splice(objIndex);
      }
    } else if (profileKeys[objIndex] === 'favoriteMovies') {
      var arrIndex = Math.floor(Math.random()*favoriteMoviesArr.length);
      $('#data').append('<p><span class="emphasize">' + message.favoriteMovies + '</span><br>' + favoriteMoviesArr[arrIndex].title + '</p>');
      favoriteMoviesArr.splice(arrIndex,1);
      if (favoriteMoviesArr.length == 0) {
        profileKeys.splice(objIndex);
      }
    } else if (profileKeys[objIndex] === 'githubProfileImage') {
      $('#data').append('<p class="emphasize">' + message[profileKeys[objIndex]] +
      '<br><img id="profilePic" src="' + response[profileKeys[objIndex]] + '"</p>');
      profileKeys.splice(objIndex,1);
    } else {
      $('#data').append('<p><span class="emphasize">' + message[profileKeys[objIndex]] + '</span><br>' + response[profileKeys[objIndex]] + '</p>');
      profileKeys.splice(objIndex,1);
    }
  }

});

function onError(){
  console.log('error');
}
