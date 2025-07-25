import React, { useState } from "react";
import colors from "../utils/colors";

const AutoCompleteInput = ({
  id,
  label,
  value,
  onChangeFunction,
  placeholder,
  suggestions = [],
  isCustom = true,
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e) => {
    const input = e.target.value;
    onChangeFunction(e); // send change to parent
    const filtered = suggestions.filter((item) =>
      item.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
    setActiveIndex(-1);
  };

  const handleSelect = (item) => {
    onChangeFunction({
      target: {
        name: id,
        value: item,
      },
    });
    setShowSuggestions(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0) {
        handleSelect(filteredSuggestions[activeIndex]);
      } else {
        setShowSuggestions(false);
      }
    }
  };

  return (
    <div className="w-full max-w-sm relative">
      {label && (
        <label className="block mb-1 font-medium text-sm">{label}</label>
      )}
      <input
        id={id}
        name={id}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
        onFocus={() => value && setShowSuggestions(true)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="absolute z-10 bg-white w-full mt-1 rounded border shadow max-h-48 overflow-y-auto">
          {filteredSuggestions.map((item, index) => (
            <li
              key={item}
              onMouseDown={() => handleSelect(item)}
              className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                index === activeIndex ? "bg-blue-100" : ""
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoCompleteInput;
