import { ItemListPropsType } from "../../types/global";
import { Show } from "solid-js";

export default function ItemList({
  itemList,
  totalPayable,
}: ItemListPropsType) {
  return (
    <div>
      <div class="">
        <h3 class="font-bold">Your Items</h3>
        <div class="flex justify-start mt-2">
          {itemList &&
            itemList.map((item) => (
              <div class="me-4">
                {item.name}: {item.qty}
              </div>
            ))}
        </div>
      </div>
      <Show when={totalPayable && totalPayable() > 0}>
        <div class="mt-4">
          <span class="font-bold">Total:</span> Rs {totalPayable()}
        </div>
      </Show>
    </div>
  );
}
