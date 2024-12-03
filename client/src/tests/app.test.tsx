import { render, waitFor } from "@solidjs/testing-library";
import { useCart } from "../hooks/cart";
import Button from "../components/Form/Button";
import { useRefund } from "../hooks/refund";

describe("Product item add to cart", () => {
  it("should add and remove from cart and decrease and increase stock respectively", async () => {
    const product = {
      id: 1,
      name: "Test Product",
      price: 100,
      stock: 10,
    };

    const TestComponent = () => {
      const {
        cartList,
        totalPayable,
        increaseProductCount,
        decreaseProductCount,
        products,
      } = useCart(null, [product]);

      const payload = {
        id: 1,
        name: "Test Product",
        price: 100,
        currentStock: 10, // available product stock
      };

      return (
        <div>
          <Button label="+" onClick={() => increaseProductCount(payload)} />
          <Button label="-" onClick={() => decreaseProductCount(payload)} />
          <div data-testid="cartList">{cartList && cartList.length}</div>
          <div data-testid="cartListQty">
            {cartList && cartList.length && cartList[0].qty}
          </div>
          <div data-testid="totalPayable">{totalPayable && totalPayable()}</div>
          <div data-testid="productStock">{products && products[0].stock}</div>
        </div>
      );
    };
    const { getByText, getByTestId } = render(() => <TestComponent />);

    // add to cart
    const button = getByText("+");

    for (let i = 0; i < 2; i++) {
      button.click();
    }
    await waitFor(() => {
      expect(getByTestId("cartList").textContent).toBe("1");
      expect(getByTestId("cartListQty").textContent).toBe("2");
      expect(getByTestId("totalPayable").textContent).toBe("200");
      expect(getByTestId("productStock").textContent).toBe("8"); // 8 products stock after 2 addition to cart
    });

    // remove from cart
    const buttonSubtract = getByText("-");
    buttonSubtract.click();
    await waitFor(() => {
      expect(getByTestId("cartList").textContent).toBe("1");
      expect(getByTestId("cartListQty").textContent).toBe("1");
      expect(getByTestId("totalPayable").textContent).toBe("100");
      expect(getByTestId("productStock").textContent).toBe("9"); // 9 products stock after 1 removal from cart
    });
  });

  it("should give out of stock message when product is out of stock", async () => {
    const product = {
      id: 1,
      name: "Test Product",
      price: 100,
      stock: 5,
    };

    const TestComponent = () => {
      const {
        cartList,
        totalPayable,
        increaseProductCount,
        decreaseProductCount,
        products,
      } = useCart(null, [product]);

      const payload = {
        id: 1,
        name: "Test Product",
        price: 100,
        currentStock: 10, // available product stock
      };

      return (
        <div>
          <Button label="+" onClick={() => increaseProductCount(payload)} />
          <Button label="-" onClick={() => decreaseProductCount(payload)} />
          <div data-testid="cartList">{cartList && cartList.length}</div>
          <div data-testid="cartListQty">
            {cartList && cartList.length && cartList[0].qty}
          </div>
          {products && products[0].stock === 0 && (
            <div data-testid="outStock">OUT</div>
          )}
        </div>
      );
    };
    const { getByText, getByTestId } = render(() => <TestComponent />);

    // add to cart
    const button = getByText("+");

    for (let i = 0; i < 5; i++) {
      button.click();
    }
    await waitFor(() => {
      expect(getByTestId("cartList").textContent).toBe("1");
      expect(getByTestId("cartListQty").textContent).toBe("5");
      expect(getByText("OUT")).toBeInTheDocument(); // 8 products stock after 2 addition to cart
    });
  });
});

describe("Product item refund ", () => {
  it("should give array of list of selected refund item and positive response during refund process", async () => {
    const product = {
      id: 1,
      name: "Test Product",
      price: 100,
      stock: 10,
    };

    const payload = {
      id: 1,
      name: "Test Product",
      price: 100,
    };

    const mockFunction = jest.fn();

    const TestComponent = () => {
      const { refundProduct, totalRefundAmount, handleCardClick } = useRefund(
        null,
        null,
        null
      );

      return (
        <div>
          <Button label="card" onClick={() => handleCardClick(payload)} />
          <div data-testid="refundProduct">
            {refundProduct && refundProduct.length}
          </div>
          <div data-testid="totalRefundAmount">
            {totalRefundAmount && totalRefundAmount()}
          </div>
          <Button label="refund" onClick={mockFunction} />
        </div>
      );
    };

    const { getByText, getByTestId } = render(() => <TestComponent />);

    // refund
    const button = getByText("card");
    button.click();

    const buttonRefund = getByText("refund");
    buttonRefund.click();
    await waitFor(() => {
      expect(getByTestId("refundProduct").textContent).toBe("1");
      expect(getByTestId("totalRefundAmount").textContent).toBe("100");
      expect(mockFunction).toHaveBeenCalledTimes(1);
    });
  });
});
