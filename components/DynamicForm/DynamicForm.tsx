import React from "react";
import { Form, FormikValues, Formik } from "formik"; // npm i --save-dev @types/yup
import { useRouter } from "next/router";
import * as Yup from "yup";
import CustomInput from "./CustomInput";
import { useFieldsToFomikVariable } from "./useFieldsToFomikVariable";

const DynamicForm = () => {
  const formFieldsList: FieldProps[] = [
    {
      id: "store",
      name: "Practice",
      type: "text", // storeId
      model: "storeId",
      required: true,
      layout: { colClass: "col-sm-12" },
    },
    {
      id: "invoice",
      name: "Invoice Number",
      type: "text", // search
      model: "invoiceId",
      required: false,
      layout: { colClass: "col-sm-9" },
      // placeholder: "e.g. A0231183 or 2088-012-A0231183"
    },
    {
      id: "3",
      name: "3",
      type: "text", // storeId
      model: "storeId",
      required: true,
      layout: { colClass: "col-sm-12" },
    },
    {
      id: "4",
      name: "4",
      type: "text", // search
      model: "invoiceId",
      required: false,
      layout: { colClass: "col-sm-9" },
      // placeholder: "e.g. A0231183 or 2088-012-A0231183"
    },
  ];

  const { initialValues, validationSchema, onSubmit } =
    useFieldsToFomikVariable(formFieldsList);

  return (
    <>
      <Formik {...{ initialValues, validationSchema, onSubmit }}>
        {({ isSubmitting }) => (
          <Form className="flex flex-col max-w-md mx-auto space-y-2">
            {formFieldsList.map((field) => {
              // if field.type is text, return CustomInput
              if (field.type == "text") {
                return (
                  <CustomInput
                    key={field.id}
                    label={field.name}
                    name={field.id}
                    type="text"
                    required={field.required}
                    placeholder={`Enter your ${field.name}`}
                  />
                );
              }
            })}

            <button
              disabled={isSubmitting}
              type="submit"
              className="btn-primary btn-blue w-1/5 mx-auto"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default DynamicForm;

export interface FieldProps {
  id: string; // id: 'store',
  name: string; // name: 'Practice',
  type?: string; // type: 'storeId',
  model?: string; // model: 'storeId',
  required?: boolean; // required: false,
  layout?: { colClass: string }; // layout: { colClass: 'col-sm-12' }
}
