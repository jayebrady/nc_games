const request = require("supertest");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data");
const seed = require("../db/seeds/seed.js");
const app = require("../app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/categories", () => {
  test("status:200, responds with an array of category objects", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then((res) => {
        expect(res.body.categories).toHaveLength(4);
        res.body.categories.forEach((category) => {
          expect(category).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
  describe("GET /api/reviews/:review", () => {
    test.only("status:200, responds with a single review object", () => {
      return request(app)
        .get("/api/reviews/1")
        .expect(200)
        .then((res) => {
          const review = res.body.reviews;
          expect(review).toEqual(
            expect.objectContaining({
              title: expect.any(String),
              review_body: expect.any(String),
              designer: expect.any(String),
              review_img_url: expect.any(String),
              category: expect.any(String),
              created_at: expect.any(String),
              owner: expect.any(String),
              votes: expect.any(Number),
              review_id: expect.any(Number),
              //comment_count: expect.any(Number)
            })
          );
        });
    });
  });
});
// describe("GET /api/reviews/:review_id", () => {
//   test("status:400, returns with an error message", () => {
//     return request(app)
//       .get(`/api/reviews/invalid_id`)
//       .expect(400)
//       .then((res) => {
//         expect(res.body.msg).toBe("Bad Request.");
//       });
//   });
// });
// expect.objectContaining({
//   title: expect.any(String),
//   review_body: expect.any(String),
//   designer: expect.any(String),
//   review_img_url: expect.any(String),
//   category: expect.any(String),
//   created_at: expect.any(Number),
//   owner: expect.any(String),
//   votes: expect.any(Number),
//   review_id: expect.any(Number),
//   //comment_count: expect.any(Number),
