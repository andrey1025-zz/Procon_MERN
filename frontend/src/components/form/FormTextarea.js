import React from "react";
import { useFormikContext } from "formik";

import Textarea from "../Textarea";

function AppFormTextarea({ name, className = "", width, ...otherProps }) {
  const {
    setFieldTouched,
    setFieldValue,
    values,
  } = useFormikContext();
  return (
    <>
      <Textarea
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

export default AppFormTextarea;
