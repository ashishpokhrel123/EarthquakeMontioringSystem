const request = require("supertest");
const app = require("../index");


describe("Testing API End Point", () => {
  it("POST /earthquake - Should store earthquake data", async () => {
    const res = await request(app)
      .post("/api/earthquake/load-data")
      .send({
        date:  new Date(`$2024-02-01T00:00:00Z`),
        frequency: ["4.5", "5.6", "6.7"],
      });

    expect(res.statusCode).toEqual(201);
  });

  it("Get /earthquake  - get  earthquake reading for monthly", async () => {
    const res = await request(app).get(
      "/api/earthquake/readings-monthly?date=2024-02"
    );

    expect(res.statusCode).toEqual(200);
  });

   it("Get /not-found - Should return 404 Not Found", async () => {
    const res = await request(app).get(
      "/api/not-found"
    );

    expect(res.statusCode).toEqual(404);
  });
});
