const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);

describe("When GET /api/products is called", () => {
  beforeEach(() => {});

  it("should respond with a 200 status code", async () => {
    const response = await request.get("/api/products");
    expect(response.statusCode).toBe(200);
  });

  it("should specify json in the content type header", async () => {
    const response = await request.get("/api/products");
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  it("should return an array of products", async () => {
    const response = await request.get("/api/products");
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String),
        image: expect.any(String),
        reviews: expect.any(Array),
        price: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
    );
  });
});

describe("When GET /api/products/:id is called", () => {
  beforeEach(() => {});

  it("should respond with a 200 status code", async () => {
    const response = await request.get("/api/products/1");
    expect(response.statusCode).toBe(200);
  });

  it("should specify json in the content type header", async () => {
    const response = await request.get("/api/products/1");
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  it("should return a product", async () => {
    const response = await request.get("/api/products/1");
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String),
        image: expect.any(String),
        reviews: expect.any(Array),
        price: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
    );
  });

  it("should respond with a 500 status code if the id is not an integer", async () => {
    const response = await request.get("/api/products/edfs");
    expect(response.statusCode).toBe(500);
  });

  it("should respond with a 404 status code if the product doesn't exist", async () => {
    const response = await request.get("/api/products/9999999");
    expect(response.statusCode).toBe(404);
  });
});
