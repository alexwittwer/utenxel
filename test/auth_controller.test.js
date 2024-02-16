const request = require("supertest");
const app = require("../app"); // Assuming your Express app is exported from app.js
const UserAuth = require("../models/userauth");

describe("Auth Controller", () => {
  describe("POST /login", () => {
    it("should return a JWT token on successful login", async () => {
      // Create a test user
      const testUser = new UserAuth({
        username: "testuser",
        password: "testpassword",
      });
      await testUser.save();

      // Send a login request
      const response = await request(app)
        .post("/login")
        .send({ username: "testuser", password: "testpassword" });

      // Assert the response
      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
    });

    it("should return an error message on invalid credentials", async () => {
      // Send a login request with invalid credentials
      const response = await request(app)
        .post("/login")
        .send({ username: "invaliduser", password: "invalidpassword" });

      // Assert the response
      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Invalid credentials");
    });
  });
});
