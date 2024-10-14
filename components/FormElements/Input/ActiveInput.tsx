import React from "react";

type ActiveInputProps = {
  title?: string;
  name?: string; // Add 'name' prop to the type definition
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

const ActiveInput: React.FC<ActiveInputProps> = ({
  title = "Active Input",
  name = "activeInput",
  placeholder = "Active Input",
  value,
  onChange,
  type = "text",
}) => {
  return (
    <div>
      <label className="block text-sm font-medium">{title}</label>
      <input
        name={name} // Pass the name prop to the input element
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border-[1.5px] border-primary bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
      />
    </div>
  );
};

export default ActiveInput;
