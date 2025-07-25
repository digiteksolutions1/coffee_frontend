import InputField from "./InputField";

const ClientEvaluation = ({ data, setData }) => {
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, clientComment: e.target.value }));
  };

  const clientComment = {
    id: "clientComment",
    label: "Any Comments",
    type: "text",
    value: data.clientComment,
    onChangeFunction: handleChange,
    placeholder: "Comment",
    isCustom: true,
  };

  const handleSelect = (rowKey, value) => {
    console.log(data);

    setData((prev) => {
      return {
        ...prev,
        [rowKey]: value,
      };
    });
  };

  const isSelected = (rowKey, value) => data[rowKey] === value;

  const rows = [
    {
      key: "How easy is to communicate with the client?",
      label: "How easy is to communicate with the client?",
      values: ["Easy", "Normal", "Hard"],
    },
    {
      key: "How Good is the client's Business?",
      label: "How Good is the client's Business?",
      values: ["Not Good", "Average", "Very Good"],
    },
    {
      key: "Is the client interested in the services or just time waste?",
      label: "Is the client interested in the services or just time waste?",
      values: ["Time Consuming", "Can't say for sure", "Interested"],
    },
  ];

  return (
    <>
      <table className="w-full mt-5 border border-collapse text-center cursor-pointer">
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
      <div className="flex gap-5 mt-5 items-center"></div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
        <InputField data={clientComment} />
      </div>
    </>
  );
};

export default ClientEvaluation;
