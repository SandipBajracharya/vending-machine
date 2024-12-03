import { createSignal } from "solid-js";
import TabButton from "../components/TabButton";
import PurchaseTab from "../components/Tabs/PurchaseTab";
import RefundTab from "../components/Tabs/Refundtab";

// TODO: replace all any types.

export default function Home() {
  const [activeTab, setActiveTab] = createSignal(0);

  const tabs = [
    { label: "Purchase Items", component: <PurchaseTab /> },
    { label: "Refund Items", component: <RefundTab /> },
  ];

  return (
    <section class="py-4 px-8">
      <h1 class="text-3xl font-bold text-center">Vending Machine</h1>
      <div class="flex border-b-2 border-gray-200 my-4">
        {tabs.map((tab, index) => (
          <TabButton
            label={tab.label}
            isActive={activeTab() === index}
            onClick={() => setActiveTab(index)}
          />
        ))}
      </div>

      {/* Tab Content */}
      <div class="my-4 py-4">{tabs[activeTab()].component}</div>
    </section>
  );
}
