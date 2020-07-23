import React from "react";
import { ErrorMessage } from './form';
import { useFormikContext } from "formik";

function Input({ icon, label = "", width = "100%", className = "", name, ...otherProps }) {
    const {
        errors,
        touched,
    } = useFormikContext();
    return (
        <>
            <input className={`${className} form-control ${errors && errors[name] && touched[name] ? 'is-invalid' : ""}`}
                {...otherProps}
            />
            {errors && errors[name] ? <ErrorMessage error={errors[name]} visible={touched[name]} /> : null}
        </>
    );
}
export default Input;
