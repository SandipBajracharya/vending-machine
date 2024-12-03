import request from "supertest";
import { app } from "../../app";
import { SUCCESS_FETCH } from "../../constant/message";

describe("GET: product list", () => {
  it("should return 200 OK", async () => {
    const response = await request(app)
      .get("/api/product")
      .set("Accept", "application/json");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe(SUCCESS_FETCH);
    expect(response.body.data).toMatchObject([
      {
        id: 1,
        name: "Coke",
        stock: 10,
        price: 20,
      },
      {
        id: 2,
        name: "Pepsi",
        stock: 10,
        price: 25,
      },
      {
        id: 3,
        name: "Dew",
        stock: 10,
        price: 30,
      },
    ]);
  });
});
