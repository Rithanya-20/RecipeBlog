import React, { useState } from "react";

const DynamicInputs = () => {
  const [inputs, setInputs] = useState([""]);

  const addInput = (e) => {
    e.preventDefault()
    setInputs((prev) => [...prev, ""]);
  };

  const handleChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold">Dynamic Input Fields</h2>

      {inputs.map((value, index) => (
        <input
          key={index}
          type="text"
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder={`Input ${index + 1}`}
        />
      ))}

      <button
        onClick={addInput}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Input
      </button>
    </div>
  );
};

export default DynamicInputs;
