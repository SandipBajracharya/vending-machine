import { Match, Show, Switch, useContext } from "solid-js";
import { ProductContext } from "../../contexts/ProductProvider";
import ProductItem from "../Product/ProductItem";
import NoData from "../NoData";
import Button from "../Form/Button";
import HighlightMessage from "../HighlightMessage";
import { ProductContextProviderType } from "../../types/product";
import { useRefund } from "../../hooks/refund";

export default function RefundTab() {
  const {
    triggerNewCycle,
    productHookContext: { productList, processRefundProduct, error },
  }: ProductContextProviderType = useContext(ProductContext);

  const {
    refundProduct,
    totalRefundAmount,
    handleCardClick,
    handleRefundProcess,
    refundAmount,
  } = useRefund(triggerNewCycle, processRefundProduct, error);

  return (
    <Show when={productList.length > 0} fallback={<NoData />}>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {productList.map((product) => {
          return (
            <ProductItem
              product={product}
              handleCardClick={handleCardClick}
              showAdditinalInfo={false}
            />
          );
        })}
      </div>

      <div class="mt-8 my-4">
        <HighlightMessage type={"info"}>
          <b>Note:</b> Only one item of each type can be refunded at a time.
        </HighlightMessage>
        <Switch>
          <Match when={Object.keys(refundProduct).length === 0}>
            <p>Please select items to refund</p>
          </Match>
          <Match when={Object.keys(refundProduct).length > 0}>
            <div class="sm:flex">
              {refundProduct.map((item) => (
                <div class="me-4">
                  <span class="capitalize">{item.name}</span>:{" "}
                  <span>Rs {item.price}</span>
                </div>
              ))}
            </div>
            <div class="mt-2">
              <span class="font-bold">Total:</span> Rs {totalRefundAmount()}
            </div>
          </Match>
        </Switch>
      </div>

      <Show when={error && error()}>
        <HighlightMessage type={"danger"}>{error && error()}</HighlightMessage>
      </Show>

      <Button
        label="Refund"
        isPrimary
        className="px-6 py-2"
        disabled={Object.keys(refundProduct).length === 0}
        onClick={handleRefundProcess}
      />

      <Show when={Object.keys(refundAmount).length > 0 && error && !error()}>
        <div class="mt-4">
          <HighlightMessage type={"success"}>
            Refund successful.
          </HighlightMessage>
        </div>
        <div class="mt-4 flex justify-between">
          <div>
            <span class="font-bold">Total refund:</span> Rs{" "}
            {refundAmount.totalReturn}
          </div>
          <div>
            <span class="font-bold">Returned Coins: </span>Rs{" "}
            {refundAmount.returnedCoins}
          </div>
          <div>
            <span class="font-bold">Returned Cash: </span>Rs{" "}
            {refundAmount.returnedCash}
          </div>
        </div>
      </Show>
    </Show>
  );
}
