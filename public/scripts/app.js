$(document).ready(function(){

  var profileKeys = ['currentCity','githubProfileImage','favoriteColor','favoriteMovies','enjoy'];
  var enjoyArr, favoriteMoviesArr;
  var message = {currentCity:'I currently live in ',
                githubProfileImage:"Oh hey look it's me!",
                favoriteColor:'My favorite color is ',
                favoriteMovies:'One of my favorite movies is: ',
                enjoy:'I quite thoroughly enjoy: '}

  $.ajax({
    method: 'GET',
    url: 'https://personal-api-aquoss.herokuapp.com/api/profile',
    success: function(response){
      enjoyArr = response.enjoy;
      favoriteMoviesArr = response.favoriteMovies;
    },
    error: onError
  })


  $('#overview').on('click', function(){
    //responds with all api data
    $.ajax({
      method: 'GET',
      url: 'https://personal-api-aquoss.herokuapp.com/api/profile',
      success: function(response){
        //remove previous tidbit
        $('#data').html("");
        //check for repetition
        if (profileKeys.length === 0) {
          return $('#data').append("<p class='emphasize'>You've consumed all my tidbits!</p>");
        }
        //generate a random object key
        var objIndex = Math.floor(Math.random()*(profileKeys.length));
        if (profileKeys[objIndex] === 'enjoy') {
          var arrIndex = Math.floor(Math.random()*enjoyArr.length);
          $('#data').append('<p class="emphasize">' + message.enjoy, enjoyArr[arrIndex] + '</p>');
          enjoyArr.splice(arrIndex,1);
          if (enjoyArr.length === 0) {
            profileKeys.splice(objIndex);
          }
        } else if (profileKeys[objIndex] === 'favoriteMovies') {
          var arrIndex = Math.floor(Math.random()*favoriteMoviesArr.length);
          $('#data').append('<p class="emphasize">' + message.favoriteMovies, favoriteMoviesArr[arrIndex].title + '</p>');
          favoriteMoviesArr.splice(arrIndex,1);
          if (favoriteMoviesArr.length == 0) {
            profileKeys.splice(objIndex);
          }
        } else {
          $('#data').append('<p class="emphasize">' + message[profileKeys[objIndex]], response[profileKeys[objIndex]] + '</p>');
          profileKeys.splice(objIndex,1);
        }
      },
      error: onError
    })
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

});

function onError(){
  console.log('error');
}
