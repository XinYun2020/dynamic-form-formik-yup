import { useField } from "formik";
import React from "react";

const CustomCheckbox = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div className="checkbox mt-1">
        <input
          {...field}
          {...props}
          className={meta.touched && meta.error ? "input-error" : ""}
        />
        <span className="ml-2">I accept the terms of service</span>
      </div>

      {meta.touched && meta.error && (
        <div className="text-[#D9534F] text-sm">{meta.error}</div>
      )}
    </>
  );
};
export default CustomCheckbox;
