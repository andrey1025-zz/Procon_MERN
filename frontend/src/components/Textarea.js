import React from "react";
import { ErrorMessage } from './form';
import { useFormikContext } from "formik";

function Textarea({ icon, label = "", width = "100%", className = "", name, ...otherProps }) {
    const {
        errors,
        touched,
    } = useFormikContext();
    return (
        <>
            <textarea className={`${className} form-control ${errors && errors[name] && touched[name] ? 'is-invalid' : ""}`}
                {...otherProps}
            >
            </textarea>
            {errors && errors[name] ? <ErrorMessage error={errors[name]} visible={touched[name]} /> : null}
        </>
    );
}
export default Textarea;
