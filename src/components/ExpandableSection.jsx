import colors from "../utils/colors";
import { useState } from "react";
import { ChevronDown, ChevronUp, Save } from "lucide-react";

export default function ExpandableSection({
  title,
  children,
  isOpenByDefault = true,
  onChange,
  name,
}) {
  return (
    <div
      className={`overflow-hidden mb-2 transition-all duration-300  ${
        isOpenByDefault ? "border-t border-black py-5" : ""
      }`}
      style={{
        opacity: isOpenByDefault ? 1 : 0.3,
      }}
    >
      {/* Section Header */}
      <button
        // type="checkbox"
        type="button"
        onClick={() => onChange(null, name)}
        value={isOpenByDefault}
        className="w-full flex items-center justify-between p-4 text-left relative cursor-pointer opacity-80 hover:bg-gray-300 hover:!bg-grey-300"
      >
        {/* Spacer div for alignment */}
        <div style={{ width: "24px" }}></div>

        {/* Centered title */}
        <h3
          className="font-bold text-xl absolute left-1/2 transform -translate-x-1/2 text-center pointer-events-none"
          style={{ color: colors.text }}
        >
          {title}
        </h3>

        {/* Icon */}
        <div
          className="p-1 rounded-full"
          style={{
            backgroundColor: isOpenByDefault
              ? colors.primary + "20"
              : "transparent",
            color: colors.primary,
          }}
        >
          {isOpenByDefault ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </div>
      </button>

      {/* Section Content */}
      <div
        className="overflow-hidden transition-all duration-300 p-0"
        style={{
          maxHeight: isOpenByDefault ? "1000px" : "0px", // Arbitrary large value when open
          opacity: isOpenByDefault ? 1 : 0,
          padding: isOpenByDefault ? "10px" : "0px",
        }}
      >
        {children}
      </div>
    </div>
  );
}
