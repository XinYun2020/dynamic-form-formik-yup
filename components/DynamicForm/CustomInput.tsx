import { useField } from "formik";
import React from "react";

const CustomInput = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label
        className={`text-left font-semibold block text-sm ${
          meta.touched && meta.error ? "text-[#D9534F]" : ""
        }`}
      >
        {meta.touched && meta.error ? `${meta.error}` : `${label}`}
        {
          // props.required is ture then add * to label
          props.required ? <span className="text-red-500">*</span> : null
        }
      </label>
      <input
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
export default CustomInput;
