const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../db/app");

beforeEach(() => {
  return seed(testData);
});
afterAll(() => db.end());

describe("GET /api/categories", () => {
  test("status 200, responds with array of categories", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        expect(body.categories).toBeInstanceOf(Array);
      });
  });
});

describe("GET /api/reviews/:review_id", () => {
  test("status 200, responds with requested review", () => {
    const REVIEW_ID = 2;
    return request(app)
      .get(`/api/reviews/${REVIEW_ID}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.review).toBeInstanceOf(Object);
        // expect(body.review).toEqual({
        //   review_id: 2,
        //   title: "Jenga",
        //   review_body: "Fiddly fun for all the family",
        //   designer: "Leslie Scott",
        //   review_img_url:
        //     "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        //   votes: 5,
        //   category: "dexterity",
        //   owner: "philippaclaire9",
        //   created_at: "2021-01-18T10:01:41.251Z",
        // });
      });
  });
});
describe("PATCH /api/reviews/:review_id", () => {
  test("status 200, responds with updated review", () => {
    const reviewUpdate = {
      inc_votes: 5,
    };
    const REVIEW_ID = 2;
    return request(app)
      .patch(`/api/reviews/${REVIEW_ID}`)
      .send(reviewUpdate)
      .expect(200)
      .then(({ body }) => {
        expect(body.review).toBeInstanceOf(Object);
        expect(body.review).toEqual({
          review_id: 2,
          title: "Jenga",
          review_body: "Fiddly fun for all the family",
          designer: "Leslie Scott",
          review_img_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          votes: 10,
          category: "dexterity",
          owner: "philippaclaire9",
          created_at: "2021-01-18T10:01:41.251Z",
        });
      });
  });
});
describe("GET /api/reviews", () => {
  test("status 200, responds with array of reviews", () => {
    return request(app)
      .get(`/api/reviews`)
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toBeInstanceOf(Array);
        expect(body.reviews[0]).toBeInstanceOf(Object);
        expect(body.reviews[0]).toHaveProperty("designer");
        expect(body.reviews[0]).toHaveProperty("votes");
      });
  });
});
describe("GET /api/reviews/:review_id/comments", () => {
  test("status 200, responds with an array of comments for the given review_id", () => {
    return request(app)
      .get("/api/reviews/3/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toBeInstanceOf(Array);
        expect(body.comments[0]).toHaveProperty("author");
        expect(body.comments[0]).toHaveProperty("body");
      });
  });
});
describe("POST /api/reviews/:review_id/comments", () => {
  test("status 201, adds new comment for the responding review and returns it", () => {
    const newComment = {
      username: "bainesface",
      body: "This review is not helpful and is very biased.",
    };
    return request(app)
      .post("/api/reviews/2/comments")
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        expect(body.comment).toBeInstanceOf(Object);
        expect(body.comment[0]).toHaveProperty("author");
        expect(body.comment[0]).toHaveProperty("created_at");
      });
  });
});
