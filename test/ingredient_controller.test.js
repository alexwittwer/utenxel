const request = require("supertest");
const app = require("../controllers/ingredient_controller");

describe("Ingredient Controller", () => {
  it("should return all ingredients", async () => {
    const response = await request(app).get("/ingredients").expect(200);

    // Add your assertions here
  });

  it("should create a new ingredient", async () => {
    const response = await request(app)
      .post("/ingredients")
      .send({ name: "New Ingredient" })
      .expect(201);

    // Add your assertions here
  });

  it("should update an existing ingredient", async () => {
    const response = await request(app)
      .put("/ingredients/1")
      .send({ name: "Updated Ingredient" })
      .expect(200);

    // Add your assertions here
  });

  it("should delete an existing ingredient", async () => {
    const response = await request(app).delete("/ingredients/1").expect(204);

    // Add your assertions here
  });
});
