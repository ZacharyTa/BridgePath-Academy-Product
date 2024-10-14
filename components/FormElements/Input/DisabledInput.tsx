import React from "react";

type DisabledInputProps = {
  title?: string;
  placeholder?: string;
  value?: string;
};

const DisabledInput: React.FC<DisabledInputProps> = ({
  title = "Disabled Input",
  placeholder = "Disabled Input",
  value,
}) => {
  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        {title}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        disabled
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
      />
    </div>
  );
};

export default DisabledInput;
