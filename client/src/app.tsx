import { createSignal, Suspense, type Component } from "solid-js";
import { useRoutes } from "@solidjs/router";

import { routes } from "./routes";
import Loading from "./components/Loading";
import ProductProvider from "./contexts/ProductProvider";
import { useProduct } from "./hooks/product";
import { ProductHookResponseType } from "./types/product";

const App: Component = () => {
  const Route = useRoutes(routes);
  const [triggerNewCycle, setTriggerNewCycle] = createSignal<boolean>(true);
  const {
    productList,
    processProductPurchase,
    processRefundProduct,
    error,
  }: ProductHookResponseType = useProduct([
    triggerNewCycle,
    setTriggerNewCycle,
  ]);

  return (
    <>
      <main class="flex justify-center min-h-screen text-gray-700 bg-gray-100">
        <Suspense fallback={<Loading />}>
          <ProductProvider
            productList={productList}
            processProductPurchase={processProductPurchase}
            processRefundProduct={processRefundProduct}
            triggerNewCycle={triggerNewCycle}
            setTriggerNewCycle={setTriggerNewCycle}
            error={error}
          >
            <div class="w-full md:w-[70%] xl:w-[50%] 2xl:w-[40%] py-5">
              <Route />
            </div>
          </ProductProvider>
        </Suspense>
      </main>
    </>
  );
};

export default App;
