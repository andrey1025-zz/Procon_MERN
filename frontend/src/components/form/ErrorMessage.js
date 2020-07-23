import React from "react";


function ErrorMessage({ error = "", visible }) {
  if (!visible || !error) return null;

  return <div className="invalid-feedback" style={{ display: 'block' }}>{error}</div>;
}

export default ErrorMessage;
