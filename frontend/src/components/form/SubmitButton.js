import React from "react";
import { useFormikContext } from "formik";

import Button from "../Button";

function SubmitButton({ title, loading = false, disabled = false, className = "submit-button btn-block btn-lg waves-effect waves-light" }) {
  const { handleSubmit } = useFormikContext();

  return <Button title={title} onClick={handleSubmit} loading={loading} disabled={disabled} className={className} />;
}

export default SubmitButton;
