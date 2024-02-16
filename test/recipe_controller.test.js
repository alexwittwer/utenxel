const request = require("supertest");
const app = require("./app");
const Recipe = require("../models/recipe");
const Ingredient = require("../models/ingredient");

describe("Recipe Controller", () => {
    describe("GET /recipes", () => {
        it("should return all recipes", async () => {
            const response = await request(app).get("/recipes");
            expect(response.status).toBe(200);
            expect(response.body).toEqual(/* expected response body */);
        });
    });

    describe("GET /recipes/:id", () => {
        it("should return a single recipe", async () => {
            const recipeId = /* provide a valid recipe ID */;
            const response = await request(app).get(`/recipes/${recipeId}`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(/* expected response body */);
        });
    });

    describe("POST /recipes", () => {
        it("should create a new recipe", async () => {
            const recipeData = /* provide valid recipe data */;
            const response = await request(app).post("/recipes").send(recipeData);
            expect(response.status).toBe(201);
            expect(response.body).toEqual(/* expected response body */);
        });
    });

    describe("PUT /recipes/:id", () => {
        it("should update a recipe", async () => {
            const recipeId = /* provide a valid recipe ID */;
            const updatedRecipeData = /* provide updated recipe data */;
            const response = await request(app)
                .put(`/recipes/${recipeId}`)
                .send(updatedRecipeData);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(/* expected response body */);
        });
    });

    describe("DELETE /recipes/:id", () => {
        it("should delete a recipe", async () => {
            const recipeId = /* provide a valid recipe ID */;
            const response = await request(app).delete(`/recipes/${recipeId}`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(/* expected response body */);
        });
    });
});
