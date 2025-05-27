import React from "react";
import colors from "../utils/colors";

const InputFieldDisabled = (props) => {
  const inputStyle = {
    backgroundColor: colors.inputBg,
    border: `1px solid ${colors.border}`,
    color: colors.text,
  };
  return (
    <>
      <div>
        <label
          htmlFor={props.data.id}
          className="block text-sm font-medium mb-1"
          style={{ color: colors.text }}
        >
          {props.data.label}
        </label>
        <input
          disabled={true}
          id={props.data.id}
          name={props.data.id}
          type={props.data.type}
          value={props.data.value}
          onChange={props.data.onChangeFunction}
          className="w-full px-4 py-2 rounded-lg outline-none transition-all duration-200"
          style={inputStyle}
          placeholder={props.data.placeholder}
        />
      </div>
    </>
  );
};

export default InputFieldDisabled;
