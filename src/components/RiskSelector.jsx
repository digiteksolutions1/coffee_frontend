import React, { useState } from "react";
import colors from "../utils/colors";
import InputField from "./InputField";
import { industries } from "./Formvalues";
import AutoCompleteInput from "./Autocomplete";

const RiskSelector = ({
  id,
  data,
  onChangeFunction,
  industry,
  setRiskData,
}) => {
  const options = ["Low", "Medium", "High"];
  const handleSelect = (rowKey, value) => {
    console.log(data);

    setRiskData((prev) => {
      const currentRiskScoreData = prev.riskScoreData || {};
      return {
        ...prev,
        riskScoreData: {
          transactional:
            rowKey === "transactional"
              ? value
              : currentRiskScoreData.transactional || "",
          geographical:
            rowKey === "geographical"
              ? value
              : currentRiskScoreData.geographical || "",
          industry:
            rowKey === "industry" ? value : currentRiskScoreData.industry || "",
          client:
            rowKey === "client" ? value : currentRiskScoreData.client || "",
        },
      };
    });
  };

  const isSelected = (rowKey, value) => data[rowKey] === value;

  const rows = [
    {
      key: "transactional",
      label: "Transactional Risk (Cash)",
      values: ["Under 5%", "5% - 25%", "Above 25%"],
    },
    {
      key: "geographical",
      label: "Geographical Risk",
      values: [
        "Only UK",
        "Europe, UAE, Canada, US, Scandinavia, Australia and similar countries",
        "Other (High Risk)",
      ],
    },
    {
      key: "industry",
      label: "Industry Risk",
      values: [
        "Other Businesses",
        "Car washes, Convenient Stores, Restaurants, Barber shops and similar businesses",
        "Oil, Arms, Precious metals, Tobacco products, Cultural artefacts, Ivory",
      ],
    },
    {
      key: "client",
      label: "Client Risk",
      values: ["Standard Structure", "Holdings Company", "Complex Operations"],
    },
  ];

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <AutoCompleteInput
          suggestions={industries}
          id={industry.id}
          label={industry.label}
          value={industry.value}
          onChangeFunction={industry.onChangeFunction}
          placeholder={industry.placeholder}
          isCustom={industry.isCustom}
        />
      </div>
      <table className="w-full mt-5 border border-collapse text-center cursor-pointer">
        <thead className="border border-collapse bg-gray-100">
          <tr>
            <th className="w-1/5">Risk Level</th>
            <th>Low</th>
            <th>Medium</th>
            <th>High</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key} className="border">
              <td className="border px-2 py-3">{row.label}</td>
              {row.values.map((value, colIndex) => (
                <td
                  key={colIndex}
                  className={`border px-2 py-3  ${
                    isSelected(row.key, value)
                      ? "bg-blue-400 text-white font-semibold"
                      : "hover:bg-gray-200"
                  }`}
                  onClick={() => handleSelect(row.key, value)}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-5 mt-5 items-center">
        <div>
          <label
            htmlFor={id}
            id={id}
            className="text-sm font-medium mb-1"
            style={{ color: colors.text }}
          >
            Select Risk Type
          </label>
        </div>

        {options.map((option) => (
          <div className="place-items-stretch" key={option}>
            <button
              type="button"
              name="riskType"
              id={id}
              value={option}
              onClick={onChangeFunction}
              className={`
              w-full py-2 px-4 border border-black font-medium rounded
              ${
                id === option
                  ? "bg-blue-400 text-white"
                  : "bg-white text-black  hover:bg-blue-300"
              }
             
            `}
            >
              {option}
            </button>
          </div>
        ))}
        <div>
          {/* <p className="">
          Selected Risk: <strong>{riskType || "None"}</strong>
        </p> */}
        </div>
      </div>
    </>
  );
};

export default RiskSelector;
