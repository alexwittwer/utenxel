const request = require("supertest");
const app = require("../controllers/pantry_controller");

describe("Pantry Controller", () => {
  it("should return all items in the pantry", async () => {
    const response = await request(app).get("/pantry").expect(200);

    // Add your assertions here
    // For example, you can check if the response body contains the expected items
  });

  it("should add a new item to the pantry", async () => {
    const newItem = {
      name: "Milk",
      quantity: 2,
    };

    const response = await request(app)
      .post("/pantry")
      .send(newItem)
      .expect(201);

    // Add your assertions here
    // For example, you can check if the response body contains the newly added item
  });

  it("should update an existing item in the pantry", async () => {
    const updatedItem = {
      name: "Bread",
      quantity: 3,
    };

    const response = await request(app)
      .put("/pantry/1")
      .send(updatedItem)
      .expect(200);

    // Add your assertions here
    // For example, you can check if the response body contains the updated item
  });

  it("should delete an item from the pantry", async () => {
    const response = await request(app).delete("/pantry/1").expect(204);

    // Add your assertions here
    // For example, you can check if the response body is empty
  });
});
