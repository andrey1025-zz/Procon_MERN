import React from "react";
import { Formik } from "formik";

function AppForm({ initialValues, onSubmit, validationSchema, enableReinitialize = false, children }) {

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize={enableReinitialize}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

export default AppForm;
