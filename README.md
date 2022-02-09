#Games API#  PSQL, express, jest

#Setup
To setup the project locally:

Navigate to your desired directory.
Run this code in your terminal: git clone https://github.com/NatassaV/myGames.git

npm install to install all the dependencies

Creating the .env files :
You will need to create two .env files for your project: .env.test and .env.development.
Into each, add PGDATABASE=<database_name_here>, with the correct database name for that environment (see /db/setup.sql for the database names). Double check that these .env files are .gitignored.

An api to access reviews for a list of games, login and vote for reviews, leave a comment and vote for comments.
Endpoints for voted not available yet. Real signing up not available but coming soon!
Login as happyamy2016 and leave you comment- make it witty :D

Hosted on heroku : https://games-reviewed.herokuapp.com/api/categories
Frontend deployed on Netlify : https://reviews-games.netlify.app/
___________________________________________________________________________________________________
REST api

Data was provided and kept in backend. 

enpoints: GET /api/categories

GET /api/reviews GET /api

PATCH /api/reviews/:review_id: updates the votes on the requested review.

GET /api/reviews/:review_id: serves the requested review

GET /api/reviews/:review_id/comments: serves the comments related to a specific review

POST /api/reviews/:review_id/comments: adds a new comment to the review with review_id

DELETE /api/comments/:comment_id: deleted a comment
