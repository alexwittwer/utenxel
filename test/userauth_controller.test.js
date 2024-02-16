const request = require("supertest");
const app = require("../app"); // Assuming your Express app is exported from app.js
const authController = require("../controllers/auth_controller");

describe("Auth Controller", () => {
  it("should return a 200 status code when logging in with valid credentials", async () => {
    const response = await request(app).post("/login").send({
      username: "testuser",
      password: "testpassword",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should return a 401 status code when logging in with invalid credentials", async () => {
    const response = await request(app).post("/login").send({
      username: "testuser",
      password: "wrongpassword",
    });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("error");
  });

  // Add more test cases for other endpoints and scenarios as needed
});
