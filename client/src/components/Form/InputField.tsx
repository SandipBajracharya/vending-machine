import { InputFieldPropsType } from "../../types/global";
import { Show } from "solid-js";

export default function InputField(props: InputFieldPropsType) {
  const { type, name, className, onInput, min, checked } = props;

  const handleInput = (event: InputEvent) => {
    event.preventDefault();

    const input = event.target as HTMLInputElement;
    if (type === "number") {
      if (input.value.includes("-")) {
        input.value = input.value.replace("-", "");
      }
    }
    onInput && onInput(event);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    // Prevent "-" and any non-numeric input except control keys
    if (
      e.key === "-" ||
      (!/[0-9]/.test(e.key) &&
        !["Backspace", "ArrowLeft", "ArrowRight"].includes(e.key))
    ) {
      e.preventDefault();
    }
  };

  const handlePaste = (e: ClipboardEvent) => {
    const clipboardData = e.clipboardData;
    const pastedData = clipboardData?.getData("Text");
    // Prevent paste if data contains negative sign or non-numeric characters
    if (pastedData.includes("-") || !/^\d*$/.test(pastedData)) {
      e.preventDefault();
    }
  };

  return (
    <div>
      <Show when={type === "radio"}>
        <label for={`${name}${props.value}`} class="me-2 capitalize">
          {props.value}
        </label>
      </Show>

      <input
        id={`${name}${props.value}`}
        class={`border-2 border-gray-200 rounded-lg p-2 ${className}`}
        name={name}
        type={type}
        min={min ? min : null}
        value={props.value ? props.value : type === "number" ? 0 : ""}
        checked={type === "radio" && checked}
        onInput={handleInput}
        onKeyDown={type === "number" ? handleKeyDown : null}
        onPaste={type === "number" ? handlePaste : null}
      />
    </div>
  );
}
