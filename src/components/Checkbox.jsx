import React from "react";

const Checkbox = ({ label, checked, onChange, name }) => {
  return (
    <div>
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <span>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
