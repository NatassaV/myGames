#Games API#

#Setup
To setup the project locally:

Navigate to your desired directory.

Run this code in your terminal: git clone https://github.com/NatassaV/myGames.git

npm install to install all the dependencies

An api to access reviews for a list of games, login and vote for reviews, leave a comment and vote for comments.
Endpoints for voted not available yet. Real signing up not available but coming soon!

Login as happyamy2016 and leave you comment- make it witty :D

Frontend deployed on Netlify : https://reviews-games.netlify.app/


REST api

Data was provided and kept in backend. PSQL, express, jest.
Hosted on heroku : https://games-reviewed.herokuapp.com/api/categories

enpoints: GET /api/categories

GET /api/reviews GET /api

PATCH /api/reviews/:review_id: updates the votes on the requested review.

GET /api/reviews/:review_id: serves the requested review

GET /api/reviews/:review_id/comments: serves the comments related to a specific review

POST /api/reviews/:review_id/comments: adds a new comment to the review with review_id

DELETE /api/comments/:comment_id: deleted a comment
