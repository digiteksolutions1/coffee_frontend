import React from "react";
import colors from "../utils/colors";

const InputField = (props) => {
  const inputStyle = {
    backgroundColor: colors.inputBg,
    border: `1px solid ${colors.border}`,
    color: colors.text,
  };

  // Custom onChange for discountValue
  const handleInputChange = (e) => {
    const { value } = e.target;

    if (props.data.id === "discountValue") {
      // Only allow numbers 0-100, no decimals
      const numeric = value.replace(/\D/g, ""); // remove non-digits

      const intValue = parseInt(numeric, 10);
      if (numeric === "" || (intValue >= 0 && intValue <= 100)) {
        props.data.onChangeFunction({
          target: {
            name: props.data.id,
            value: numeric,
          },
        });
      }
    } else {
      props.data.onChangeFunction(e);
    }
  };

  return (
    <div>
      <label
        htmlFor={props.data.id}
        className="block text-sm font-medium mb-1"
        style={{ color: colors.text }}
      >
        {props.data.label}
      </label>
      <input
        disabled={!props.data.isCustom}
        id={props.data.id}
        name={props.data.id}
        type={props.data.type}
        value={props.data.value ?? ""}
        onChange={handleInputChange}
        className="w-full px-4 py-2 rounded-lg outline-none transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
        style={inputStyle}
        placeholder={props.data.placeholder}
      />
    </div>
  );
};

export default InputField;
