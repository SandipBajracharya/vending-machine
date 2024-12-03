import { ButtonPropsType } from "../../types/global";

export default function Button(props: ButtonPropsType) {
  return (
    <button
      class={` ${
        !props.disabled
          ? props.isPrimary
            ? "bg-cyan-500 text-white hover:opacity-70"
            : "border-2 border-cyan-500 hover:opacity-70"
          : "bg-gray-500 text-white cursor-not-allowed opacity-50"
      } rounded-lg ${props.className}`}
      title={props.label}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.label}
    </button>
  );
}
