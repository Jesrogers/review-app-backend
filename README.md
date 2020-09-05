# Review App Backend

An application that allows for users to create reviews of whatever they want. Built with the PERN stack (Postgres, Express, React, Node).

Use the deployed application at: [https://reviews-application.herokuapp.com](https://reviews-application.herokuapp.com).

For the frontend repository, please visit [https://github.com/Jesrogers/review-app-frontend](https://github.com/Jesrogers/review-app-frontend).

## Project Features

1. Account creation and login
2. Create reviews
 1. Reviews only accessible by creator
 2. Reviews may have a title, description, and rating (rating set via a custom StarRating component)
5. Filter reviews based on title, description, or rating
6. Choose between a card-grid or row layout for reviews
7. Update reviews
8. Delete reviews

## Running Locally
1. Clone repository
2. Create a `.env` file at the root of the project with the following variables:
 * PGUSER
 * PGHOST
 * PGPASSWORD
 * PGDATABASE   
 * PGPORT
 * ACCESS_TOKEN_SECRET
 * COOKIE_SECRET
3. Set variables, then navigate to the repository in your terminal and run `npm install` followed by `npm run dev`

## Video Demo and Screenshots

### Video
[![video demo](https://i.imgur.com/BX2ndjb.png)](http://www.youtube.com/watch?v=cO7tq4hRWA8)

### Reviews area

![reviews section](https://i.imgur.com/piUqgcT.png)

### Review creation

![review form](https://i.imgur.com/wcZx3mm.png)

### Login form

![login form](https://i.imgur.com/hokSWLK.png)