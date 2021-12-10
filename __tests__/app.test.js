const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app");
const { get } = require("superagent");

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
  test("return 400 bad request when given wrong data type", () => {
    return request(app)
      .get("/api/reviews/:something")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("oh no, that looks wrong!");
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
        // expect(body.review).toEqual({
        //   review_id: 2,
        //   title: "Jenga",
        //   review_body: "Fiddly fun for all the family",
        //   designer: "Leslie Scott",
        //   review_img_url:
        //     "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        //   votes: 10,
        //   category: "dexterity",
        //   owner: "philippaclaire9",
        //   created_at: "2021-01-18T10:01:41.251Z",
        // });
      });
  });
  test("return 400 bad request when given wrong data type", () => {
    return request(app)
      .patch("/api/reviews/:something")
      .send({ inc_votes: 3 })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("oh no, that looks wrong!");
      });
  });
});
describe("GET /api/reviews and some queries", () => {
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
  test("sort_by default is date, status 200, returns sorted reviews", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        console.log(body);
        expect(body.reviews).toBeSortedBy("created_at", { descending: true });
      });
  });
  test("status 200, returns sorted reviews by requested column and order", () => {
    return request(app)
      .get("/api/reviews?sort_by=votes&order=DESC")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toBeSortedBy("votes", { descending: true });
      });
  });
  test("status 200, returns sorted reviews by requested column and order and filtering by category", () => {
    return request(app)
      .get("/api/reviews?sort_by=votes&order=DESC&category=social deduction")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toBeSortedBy("votes", { descending: true });
      });
  });
  // test("status 400, returns error msg", () => {
  //   return request(app)
  //     .get("/api/reviews?sort_by=jokes&order=DESC")
  //     .expect(400)
  //     .then(({ body }) => {
  //       console.log(body);
  //       expect(body.msg).toBe("Sorry, sorting by that isn't valid");
  //     });
  // });
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
  test("status 400, wrong data", () => {
    const newComment = {
      username: "bainesface",
      body: "This review is not helpful and is very biased.",
    };
    return request(app)
      .post("/api/reviews/whatIsThis/comments")
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("oh no, that looks wrong!");
      });
  });
});
describe("DELETE /api/comments/:comment_id", () => {
  test("status 204, delete the given comment", () => {
    return request(app)
      .delete("/api/comments/1")
      .expect(204)
      .then(({ body }) => {
        expect(body).toEqual({});
      });
  });
  test("return 400 bad request when given wrong data type", () => {
    return request(app)
      .delete("/api/comments/:something")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("oh no, that looks wrong!");
      });
  });
});
describe("GET/api responds with a description of available end points", () => {
  test("Get/api status 200, responds with JSON giving the endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("Here are some endpoints you can use");
      });
  });
});
describe("GET/api", () => {
  test.only("status 200, return any table requested if it exists", () => {
    return request(app)
      .get("/api/comments")
      .expect(200)
      .then(({ body }) => {
        console.log(body);
        expect(body).toBeInstanceOf(Array);
      });
  });
});
