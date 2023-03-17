import { FormikValues } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { FieldProps } from "./DynamicForm";

// Custom hook useFieldsToFomikVariable returning initialValues, validationSchema, onSubmit
export const useFieldsToFomikVariable = (formFieldsList: FieldProps[]) => {
  // router
  const router = useRouter();

  // initialValues which use the fieldList's id as key and empty string as value, force casting the object to FormikValues type
  const initialValues = formFieldsList.reduce((acc, field) => {
    return { ...acc, [field.id]: "" };
  }, {}) as FormikValues;

  // from formFieldsList, create an object with the id as key, Yub.string() as value, check if required is true, add .required(`${id} is required`) to the value
  const validationSchemaObjectShape = formFieldsList.reduce((acc, field) => {
    // value only have .required() if field.required is true
    let value = Yup.string();
    // if field.required add .required(`${field.id} is required`) to the value
    if (field.required == true) {
      value = value.required(`${field.name} is required`);
    }

    return { ...acc, [field.id]: value };
  }, {}) as Yup.ObjectShape;

  const validationSchema = Yup.object(validationSchemaObjectShape);

  const onSubmit: any = async (values: any, actions: any) => {
    console.log("generating report with the following fields:", values);
    router.push({
      pathname:
        "/trp/finance-report/financeInvoiceJournalItemInfo?fi[…]=invoiceId,storeId&page[size]=15&page[number]=1",
      // query: values,
    });
    // router.push({ pathname: "/", query: values });
    // https://dev-api-hub.georgeandmatilda.com.au:8443/finance-report/financeInvoiceJournalItemInfo%3Ffi[%E2%80%A6]=invoiceId,storeId&page[size]=15&page[number]=1
    // http://localhost:3000/trp/finance-report/financeInvoiceJournalItemInfo%3Ffi[%E2%80%A6]=invoiceId,storeId&page[size]=15&page[number]=1
    // http://localhost:3000/trp/finance-report/financeInvoiceJournalItemInfo%3Ffi[%E2%80%A6]=invoiceId,storeId&page[size]=15&page[number]=1
    //        localhost:3000/trp/finance-report/financeInvoiceJournalItemInfo?fi[…]=invoiceId,storeId&page[size]=15&page[number]=1` => actually calling `https://dev-api-hub.georgeandmatilda.com.au/finance-report/financeInvoiceJournalItemInfo?fi[…]=invoiceId,storeId&page[size]=15&page[number]=1`
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };
  return { initialValues, validationSchema, onSubmit };
};
