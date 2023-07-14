import React, { useState } from "react";

const DynamicWidthInput = ({ text = "", onChange = () => {}, fontSize = "1.875rem", increment = 18 }) => {
  const [inputValue, setInputValue] = useState(text);

  const handleInputChange = (value) => {
    setInputValue(value);
    onChange(value);
  };

  const inputStyle = {
    width: inputValue === "" ? "1rem" : `${inputValue.length * increment}px`, // Adjust the width calculation as needed
    fontFamily: "monospace",
    outline: "black 1px solid",
    borderRadius: "5%",
    fontSize: fontSize,
  };

  return <input onClick={(e) => e.stopPropagation()} type="text" defaultValue={inputValue} onChange={(e) => handleInputChange(e.target.value)} style={inputStyle} />;
};

export default DynamicWidthInput;
