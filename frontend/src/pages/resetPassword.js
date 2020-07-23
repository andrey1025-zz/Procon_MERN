import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { loadingSelector, errorSelector } from '../store/selectors';
import { Form, SubmitButton, FormField, ErrorMessage } from '../components/form';
import { login, resetPassword } from '../store/actions/authActions';

const validationSchema = Yup.object().shape({
    newPassword: Yup.string().required().min(6).max(255).label("New Password"),
    reEnterPassword: Yup.string().equals([Yup.ref('newPassword')], "Password and Repeat Password must match").required().min(6).max(255).label("Repeat Password"),
});

const initialValues = {
    newPassword: "",
    reEnterPassword: ""
};

const SignIn = ({ match }) => {
    const loading = useSelector(state => loadingSelector(['RESET_PASSWORD'])(state));
    const errors = useSelector(state => errorSelector(['RESET_PASSWORD'])(state));
    const dispatch = useDispatch();
    const [token, setToken] = useState();

    const handleSubmit = (data, { setErrors, setSubmitting }) => {
        dispatch(resetPassword({ ...data, token }, setErrors, setSubmitting));
    }

    useEffect(() => {
        const { params } = match;
        if (params && params.token) {
            setToken(params.token);
        }
    }, [])

    return (
        <React.Fragment>
            <h1 className="text-center white">Set New Password</h1>
            <Form className="form-horizontal m-t-30"
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                initialValues={initialValues}>
                <div className="form-group">
                    <div className="row">
                        <FormField
                            name="newPassword"
                            placeholder="New Password"
                            type="password"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <FormField
                            name="reEnterPassword"
                            placeholder="Repeat Password"
                            type="password"
                        />
                    </div>
                </div>
                <div className="form-group m-t-30 m-b-0">
                    <div className="row">
                        <div className="col-sm-5 p-1">
                            <ErrorMessage error={errors.fatalError} visible={errors && errors.fatalError} />
                            <SubmitButton title='Save' loading={loading} disabled={loading} />
                        </div>
                    </div>
                </div>
            </Form>
        </React.Fragment>
    )
}
export default SignIn;