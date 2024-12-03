import { createSignal, JSX } from "solid-js";

type HighlightMessagePropsType = {
  type: "success" | "info" | "danger" | "warning";
  children: JSX.Element;
};

export default function HighlightMessage({
  type,
  children,
}: HighlightMessagePropsType) {
  const [className, setClassName] = createSignal("bg-transparent");
  switch (type) {
    case "success":
      setClassName("bg-green-300");
      break;

    case "info":
      setClassName("bg-blue-200");
      break;

    case "danger":
      setClassName("bg-red-300");
      break;

    case "warning":
      setClassName("bg-yellow-300");
      break;

    default:
      break;
  }

  return (
    <p class={`mb-4 ${className()} rounded p-2`}>
      <i>{children}</i>
    </p>
  );
}
