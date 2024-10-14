import React, { useState, useEffect, useRef } from "react";

type DefaultInputProps = {
  title?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

const DefaultInput: React.FC<DefaultInputProps> = ({
  title = "Default Input",
  name = "defaultInput",
  placeholder = "Default Input",
  value = "",
  onChange,
  type = "text",
}) => {
  // Function to format phone number as (123) 456 - 7890
  const formatPhoneNumber = (phoneNumber: string): string => {
    const cleaned = phoneNumber.replace(/\D/g, ""); // Remove non-numeric characters
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);

    if (match) {
      const formattedNumber = [
        match[1] ? `(${match[1]}` : "",
        match[2] ? `) ${match[2]}` : "",
        match[3] ? ` - ${match[3]}` : "",
      ].join("");
      return formattedNumber;
    }
    return phoneNumber;
  };

  // State to hold the formatted value
  const [formattedValue, setFormattedValue] = useState(
    type === "phoneNumber" ? formatPhoneNumber(value) : value,
  );

  // Ref to manage cursor position
  const inputRef = useRef<HTMLInputElement>(null);

  // Define the maximum length for formatted phone number: (123) 456 - 7890
  const MAX_PHONE_LENGTH = 16;

  // Effect to sync the formatted value with the passed value
  useEffect(() => {
    setFormattedValue(
      type === "phoneNumber" ? formatPhoneNumber(value || "") : value,
    );
  }, [value, type]);

  // Handle input changes with real-time formatting and cursor adjustment
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    // Format the value if type is phoneNumber
    if (type === "phoneNumber") {
      newValue = formatPhoneNumber(newValue);
      // Prevent input if max length is reached
      if (newValue.length > MAX_PHONE_LENGTH) {
        return;
      }
    }

    // Update the state and trigger onChange for external value tracking
    setFormattedValue(newValue);
    onChange &&
      onChange({ ...e, target: { ...e.target, value: newValue, name } });

    // Adjust cursor position to the end of the formatted value
    if (type === "phoneNumber") {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(newValue.length, newValue.length);
        }
      }, 0);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium">{title}</label>
      <input
        ref={inputRef} // Attach ref to manage cursor
        name={name}
        type={type === "phoneNumber" ? "text" : type} // Set type to text for phoneNumber for formatting
        placeholder={placeholder}
        value={formattedValue} // Use formatted value for display
        onChange={handleInputChange}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>
  );
};

export default DefaultInput;
