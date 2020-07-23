import React from "react";
import { ErrorMessage } from './form';
import { useFormikContext } from "formik";

function Select({ label = "", name, children, ...otherProps }) {
    const {
        errors,
        touched,
    } = useFormikContext();
    return (
        <>
            <select
                className={`custom-select ${errors && errors[name] && touched[name] ? 'is-invalid' : ""}`}
                {...otherProps}>
                {children}
            </select>
            {/* {errors && errors[name] ? <ErrorMessage error={errors[name]} visible={touched[name]} /> : null} */}
        </>
    );
}
export default Select;
