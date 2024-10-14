import React from "react";

type FileUploadSimpleProps = {
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FileUploadSimple: React.FC<FileUploadSimpleProps> = ({
  label = "Attach file",
  onChange,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <input
        type="file"
        onChange={onChange}
        className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:px-2.5 file:py-1 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
      />
    </div>
  );
};

export default FileUploadSimple;
