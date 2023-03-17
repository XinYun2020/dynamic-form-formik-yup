import { useField } from "formik";
import React from "react";

const CustomSelect = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label
        className={`font-semibold block text-sm ${
          meta.touched && meta.error ? "text-[#D9534F]" : ""
        }`}
      >
        {meta.touched && meta.error ? `${meta.error}` : `${label}`}
      </label>
      <select
        {...field}
        {...props}
        className={
          meta.touched && meta.error
            ? " border border-[#fc8181] rounded-sm"
            : ""
        }
      />
    </>
  );
};
export default CustomSelect;
