import { createSignal, Show } from "solid-js";
import Button from "./Form/Button";
import InputField from "./Form/InputField";
import { PaymentPropsType, UserPaymentType } from "../types/payment";

const resetUserPayment = {
  cash: 0,
  coin: 0,
  total: 0,
};

export default function Payment({
  totalPayable,
  cartList,
  handleProductPurchase,
}: PaymentPropsType) {
  const [userPayment, setUserPayment] =
    createSignal<UserPaymentType>(resetUserPayment);
  const [paymentType, setPaymentType] = createSignal("cash");
  const [paymentAmount, setPaymnetAmount] = createSignal(0);
  const [error, setError] = createSignal("");

  const handleInsert = (e: Event) => {
    e.preventDefault();
    error() && setError(""); // clear error after insert
    setUserPayment((prev) => ({
      ...prev,
      [paymentType()]: ((prev[paymentType()] as number) +
        paymentAmount()) as number,
      total: ((prev.total as number) + paymentAmount()) as number,
    }));
    setPaymnetAmount(0);
  };

  const handlePurchase = async (e: Event) => {
    e.preventDefault();
    error() && setError(""); // clear error after insert

    if (totalPayable && totalPayable() > userPayment().total) {
      setError("Cannot proceed. Insufficient amount.");
      return;
    }

    // payload
    const payload = {
      cartList,
      payment: { ...userPayment(), totalPayable: totalPayable() },
    };

    await handleProductPurchase(payload);
    setUserPayment(resetUserPayment);
  };

  return (
    <div class="border-b-2 border-gray-200 py-8">
      <h3 class="font-bold">Payment Section</h3>
      <div class="flex mb-4 mt-2">
        <InputField
          type="radio"
          value="cash"
          name="paymentType"
          className="mr-4"
          onInput={(e) => setPaymentType(e.target.value)}
          checked={true}
        />
        <InputField
          type="radio"
          value="coin"
          name="paymentType"
          onInput={(e) => setPaymentType(e.target.value)}
        />
      </div>
      <div class="sm:flex">
        <InputField
          type="number"
          name="amount"
          min={0}
          value={paymentAmount()}
          className="mr-4 focus:border-transparent ring-transparent ring focus-visible:border-gray-300"
          onInput={(e) => setPaymnetAmount(parseInt(e.target.value) || 0)}
        />
        <Button
          label="Insert"
          isPrimary
          className="px-6 py-2 text-sm mt-4 sm:mt-0"
          onClick={handleInsert}
          disabled={!paymentAmount()}
        />
      </div>
      <Show when={error()}>
        <div class="text-red-500 text-sm mt-2">{error()}</div>
      </Show>
      <Show when={userPayment()}>
        <div class="mt-8">
          <span class="font-bold">Your amount</span>
          <div class="sm:flex justify-between items-center mt-2">
            <div class="sm:flex">
              {Object.entries(userPayment()).map(([key, value]) => (
                <div class="me-4">
                  <span class="capitalize">{key}</span>: {value}
                </div>
              ))}
            </div>

            <Button
              label="Purchase"
              isPrimary
              onClick={handlePurchase}
              className="px-6 py-2 mt-4 sm:mt-0"
              disabled={!cartList.length}
            />
          </div>
        </div>
      </Show>
    </div>
  );
}
