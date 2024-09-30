import React from "react";

const Input = ({
  bgColor = "slate",
  borderColor = "gray",
  textColor = "red",
  type = "text",
  placeholder = "Enter text...",
  value,
  onChange = (e) => console.log("Input changed to:", e.target.value),
}) => {
  const bgClass = `bg-${bgColor}-900`;
  const borderClass = `border-${borderColor}-300`;
  const textClass = `text-${textColor}-500`;

  return (
    <input
      className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 ${bgClass} ${borderClass} ${textClass}`}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
};

export { Input };
