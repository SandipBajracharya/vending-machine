import request from "supertest";
import { app } from "../../app";
import { BAD_REQUEST, UNPROCESSABLE } from "../../constant/httpStatusCode";
import {
  INSUFFICIENT_AMOUNT,
  INSUFFICIENT_FUND,
  OUT_OF_STOCK,
  SUCCESS_PURCHASE,
  SUCCESS_REFUND,
  UNAVAILABLE_PRODUCT,
} from "../../constant/message";

describe("PUT: purchase transaction", () => {
  const payload = {
    cartList: [{ id: 1, name: "Coke", price: 20, qty: 1 }],
    payment: { cash: 40, coin: 0, total: 40, totalPayable: 20 },
  };
  const purchaseResponse = {
    dispatchedProducts: [
      {
        id: 1,
        name: "Coke",
        qty: 1,
        price: 20,
      },
    ],
    returnedCoins: 20,
    returnedCash: 0,
    totalReturn: 20,
  };

  it("should return 200 OK", async () => {
    const response = await request(app)
      .put("/api/account/purchase")
      .send(payload)
      .set("Accept", "application/json");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe(SUCCESS_PURCHASE);
    expect(response.body.data).toMatchObject(purchaseResponse);
  });

  it("should return 400 Bad Request", async () => {
    const payload = {
      cartList: [{ id: 4, name: "Sprite", price: 50, qty: 1 }],
      payment: { cash: 40, coin: 0, total: 40, totalPayable: 20 },
    };
    const response = await request(app)
      .put("/api/account/purchase")
      .send(payload)
      .set("Accept", "application/json");
    expect(response.status).toBe(BAD_REQUEST);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(UNAVAILABLE_PRODUCT);
  });

  it("should return 422 Unprocessable when requested quantity is greater than stock", async () => {
    const payload = {
      cartList: [{ id: 1, name: "Coke", price: 20, qty: 11 }], // original stock is 10
      payment: { cash: 220, coin: 0, total: 220, totalPayable: 220 },
    };
    const response = await request(app)
      .put("/api/account/purchase")
      .send(payload)
      .set("Accept", "application/json");
    expect(response.status).toBe(UNPROCESSABLE);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(OUT_OF_STOCK);
  });

  it("should return 422 Unprocessable when payment amount is less than total payable", async () => {
    const payload = {
      cartList: [{ id: 1, name: "Coke", price: 20, qty: 1 }], // original stock is 10
      payment: { cash: 15, coin: 0, total: 15, totalPayable: 20 },
    };
    const response = await request(app)
      .put("/api/account/purchase")
      .send(payload)
      .set("Accept", "application/json");
    expect(response.status).toBe(UNPROCESSABLE);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(INSUFFICIENT_AMOUNT);
  });
});

describe("PUT: refund transaction", () => {
  const payload = {
    itemList: [{ id: 1, name: "Coke", price: 20, qty: 1 }],
    totalRefundAmount: 20,
  };

  it("should return 200 OK", async () => {
    const response = await request(app)
      .put("/api/account/refund")
      .send(payload)
      .set("Accept", "application/json");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe(SUCCESS_REFUND);
    expect(response.body.data).toMatchObject({
      returnedCoins: 20,
      returnedCash: 0,
      totalReturn: 20,
    });
  });

  it("should return 422 OK", async () => {
    const payload = {
      itemList: [
        { id: 1, name: "Coke", price: 20, qty: 1 },
        { id: 3, name: "Dew", price: 30, qty: 10 },
      ],
      totalRefundAmount: 320,
    };
    const response = await request(app)
      .put("/api/account/refund")
      .send(payload)
      .set("Accept", "application/json");
    expect(response.status).toBe(UNPROCESSABLE);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(INSUFFICIENT_FUND);
  });
});
