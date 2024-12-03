import { Match, Show, Switch } from "solid-js";
import Button from "../Form/Button";
import { ProductType } from "../../types/product";

export default function ProductItem({
  product,
  showAdditinalInfo = true,
  handleButtonClick,
  handleCardClick = null,
}: {
  product: ProductType;
  showAdditinalInfo?: boolean;
  handleButtonClick?: (object) => void;
  handleCardClick?: (object) => void;
}) {
  return (
    <div
      class="bg-white rounded-lg shadow-md text-center p-5"
      onClick={() =>
        handleCardClick &&
        handleCardClick({
          id: product.id,
          name: product.name,
          price: product.price,
        })
      }
    >
      <h2 class="text-xl font-bold">{product?.name}</h2>
      <div class="flex justify-between my-5 text-sm">
        <Switch>
          <Match when={showAdditinalInfo}>
            <span class={product?.stock === 0 && "text-red-500"}>
              Stock:{" "}
              {product?.stock > 0 ? (
                product.stock
              ) : (
                <span data-testid="outStock">OUT</span>
              )}
            </span>
          </Match>
          <Match when={!showAdditinalInfo}>
            <span>Qty: 1</span>
          </Match>
        </Switch>
        <span>Price: Rs {product?.price}</span>
      </div>
      <Show when={showAdditinalInfo}>
        <div class="flex justify-between w-full">
          <Button
            label="+"
            onClick={() => handleButtonClick({ action: "add", ...product })}
            className="px-4 py-1 text-xl lg:text-2xl"
          />
          <Button
            label="-"
            onClick={() =>
              handleButtonClick({ action: "subtract", ...product })
            }
            className="px-4 py-1 text-xl lg:text-2xl"
          />
        </div>
      </Show>
    </div>
  );
}
