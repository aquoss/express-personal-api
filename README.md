# Amber Quoss Personal API

A JSON API for data about my coding projects and my quirks!

I will have many projects and many profile attributes, but both of those will belong to only me.

## Data Brainstorm

### API
- message
- documentation url
- base url
- endpoints

### Profile

- name
- github username
- github link
- github profile image
- personal site link
- current city
- favorite color
- enjoy (array)

### Favorite Movies

- title
- director
- stars
- description

### Projects

- name
- date created
- description
- technologies used
- deployment site
- screenshot

## Routes  (Endpoints)

- `GET /api` list all routes
- 'GET /api/profile' randomly display profile attributes

### RESTful Routes for Projects

- `GET	/projects`	 	    display a list of all projects
- `POST	/projects`	      create a new project
- `GET	/projects/url`	  display a specific project by screenshot url
- `PUT	/projects/url`	  update a specific project by screenshot url
- `DELETE	/projects/url`  delete a specific project by screenshot url

### Relationship Planning

Reference vs embedded?
  - embed favorite movies into profile since they are all specific to my own taste
    
### Nested Routes 

- `GET	/api/projects`	 	          display all projects
- `GET  /api/profile`               (randomly) display profile attributes
- `POST	/api/projects`	            create a new project
------- not yet built in ---------
- `PUT	/api/projects`          	  update a specific project
- `DELETE	/api/projects`            delete a specific project