import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { loadingSelector, errorSelector } from '../store/selectors';
import { Form, SubmitButton, FormField, ErrorMessage } from '../components/form';
import { forgetPassword } from '../store/actions/authActions';

const validationSchema = Yup.object().shape({
    email: Yup.string().email().max(255).required().label("Email")
});

const initialValues = {
    email: "",
};

const ForgetPassword = () => {

    const loading = useSelector(state => loadingSelector(['FORGET_PASSWORD'])(state));
    const errors = useSelector(state => errorSelector(['FORGET_PASSWORD'])(state));
    const dispatch = useDispatch();

    const handleSubmit = (data, { setErrors, setSubmitting }) => {
        dispatch(forgetPassword(data, setErrors, setSubmitting, `/authentication/message?m=Password reset link sent to ${data.email}, please check your email.`));
    }

    return (
        <React.Fragment>
            <h1 className="text-center white">Forget password</h1>
            <Form className="form-horizontal m-t-30"
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                initialValues={initialValues}>
                <div className="form-group">
                    <div className="row">
                        <FormField name="email" placeholder="Email" />
                    </div>
                </div>
                <div className="form-group m-t-30 m-b-0">
                    <div className="row">
                        <div className="col-sm-5 p-0">
                            <ErrorMessage error={errors.fatalError} visible={errors && errors.fatalError} />
                            <SubmitButton title='Send Email' loading={loading} disabled={loading} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="p-0">
                            <Link to={'/authentication/sign-in'} className="text-muted1">Sign in instead</Link>
                        </div>
                    </div>
                </div>
            </Form>
        </React.Fragment>
    )
}
export default ForgetPassword;