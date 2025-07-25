import React from "react";
import colors from "../utils/colors";

const Dropdown = (props) => {
  const inputStyle = {
    backgroundColor: colors.inputBg, // White background for all inputs
    border: `1px solid ${colors.border}`, // Border color matching primary color
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
        <select
          id={props.data.id}
          name={props.data.id}
          value={props.data.value}
          onChange={props.data.onChangeFunction}
          className="w-full px-4 py-2 rounded-lg outline-none transition-all duration-200 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
          style={{
            ...inputStyle,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%231E90FF'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1rem center",
            backgroundSize: "1rem",
            paddingRight: "2.5rem",
          }}
        >
          <option value="">{props.data.placeholder}</option>
          {props.data?.dataOption?.map((o) => (
            <option key={o.label} value={o.label}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Dropdown;
