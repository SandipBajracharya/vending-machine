import { TabButtonPropType } from "../types/global";

export default function TabButton(props: TabButtonPropType) {
  return (
    <button
      class={`px-4 py-2 text-sm ${
        props.isActive
          ? "border-b-2 border-cyan-500 font-bold"
          : "text-gray-500 hover:text-gray-700"
      }`}
      onClick={props.onClick}
      title={props.label}
    >
      {props.label}
    </button>
  );
}
