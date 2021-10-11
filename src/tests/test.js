const app = require("../server/server");
const request = require("supertest");

describe("Testing Post - Redirect - Get", () => {
  test("GET /", () => {
    return request(app)
            .get("/")
            .expect(200);
  });

  test("GET /success", () => {
    return request(app)
            .get("/")
            .expect(200);
  });

  test("POST /entry", () => {
    return request(app)
            .post("/entry")
            .set("input", "1234567890A")
            .expect(302);
  });
});
