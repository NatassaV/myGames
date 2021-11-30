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
  test.only("status 200, responds with requested review", () => {
    const REVIEW_ID = 2;
    return request(app)
      .get(`/api/reviews/${REVIEW_ID}`)
      .expect(200)
      .then(({ body }) => {
        console.log(body, "<<<<<<<<<<");
        expect(body.review).toBeInstanceOf(Object);
      });
  });
});
