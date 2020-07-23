import React from "react";
import { useFormikContext } from "formik";

import Select from '../Select';

function AppFormSelect({
    name,
    ...otherProps
}) {
    const { setFieldValue, values, setFieldTouched } = useFormikContext();
    return (
        <>
            <Select
                onBlur={() => setFieldTouched(name)}
                onChange={(e) => setFieldValue(name, e.target.value)}
                value={values[name]}
                name={name}
                {...otherProps}>
            </Select>
        </>
    );
}

export default AppFormSelect;
