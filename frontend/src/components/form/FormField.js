import React from "react";
import { useFormikContext } from "formik";

import Input from "../Input";

function AppFormField({ name, className = "", width, ...otherProps }) {
  const {
    setFieldTouched,
    setFieldValue,
    values,
  } = useFormikContext();
  return (
    <>
      <Input
        onBlur={() => setFieldTouched(name)}
        onChange={(e) => setFieldValue(name, e.target.value)}
        value={values[name]}
        width={width}
        name={name}
        className={className}
        {...otherProps}
      />
    </>
  );
}

export default AppFormField;
