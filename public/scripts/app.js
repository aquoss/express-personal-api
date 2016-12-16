console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  // responds with all api data
  $.ajax({
    method: 'GET',
    url: 'https://personal-api-aquoss.herokuapp.com/api',
    success: onSuccess,
    error: onError
  })

  // responds with profile data
  $.ajax({
    method: 'GET',
    url: 'https://personal-api-aquoss.herokuapp.com/api/profile',
    success: onSuccess,
    error: onError
    })

  // responds with all projects
  $.ajax({
    method: 'GET',
    url: 'https://personal-api-aquoss.herokuapp.com/api/projects',
    success: onSuccess,
    error: onError
    })

  // responds with one specific project
  $.ajax({
    method: 'GET',
    url: 'https://personal-api-aquoss.herokuapp.com/api/projects/:id',
    success: onSuccess,
    error: onError
    })

  // creates a new project
  $.ajax({
    method: 'POST',
    url: 'https://personal-api-aquoss.herokuapp.com/api/projects',
    success: onSuccess,
    error: onError
    })

  // deletes a project
  $.ajax({
    method: 'DELETE',
    url: 'https://personal-api-aquoss.herokuapp.com/api/projects/:id',
    success: onSuccess,
    error: onError
    })

  // updates a project
  $.ajax({
    method: 'PATCH',
    url: 'https://personal-api-aquoss.herokuapp.com/api/projects/:id',
    success: onSuccess,
    error: onError
    })

});
