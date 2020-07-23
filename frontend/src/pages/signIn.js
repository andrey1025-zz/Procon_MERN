import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { loadingSelector, errorSelector } from '../store/selectors';
import { Form, SubmitButton, FormField, ErrorMessage } from '../components/form';
import { login } from '../store/actions/authActions';


const validationSchema = Yup.object().shape({
    email: Yup.string().email().max(255).required().label("Email"),
    password: Yup.string().required().min(6).max(255).label("Password")
});

const initialValues = {
    email: "",
    password: ""
};

const SignIn = () => {

    const loading = useSelector(state => loadingSelector(['LOGIN'])(state));
    const errors = useSelector(state => errorSelector(['LOGIN'])(state));
    const dispatch = useDispatch();

    const handleSubmit = (data, { setErrors, setSubmitting }) => {
        dispatch(login(data, setErrors, setSubmitting));
    }

    return (
        <React.Fragment>
            <h1 className="text-center white">Sign In</h1>
            <Form className="form-horizontal m-t-30"
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                initialValues={initialValues}>
                <div className="form-group">
                    <div className="row">
                        <FormField name="email" placeholder="Email" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <FormField
                            name="password"
                            placeholder="Password"
                            type="password"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-6 offset-6 p-0 text-right">
                            <Link to={'/authentication/forget-password'} className="text-muted1"><i className="fa fa-lock m-r-5"></i>Forgot password?</Link>
                        </div>
                    </div>
                </div>
                <div className="form-group m-t-30 m-b-0">
                    <div className="row">
                        <div className="col-sm-5 p-1">
                            <ErrorMessage error={errors.fatalError} visible={errors && errors.fatalError} />
                            <SubmitButton title='Login' loading={loading} disabled={loading} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="p-0">
                            <Link to={'/authentication/register'} className="text-muted1">Create account</Link>
                        </div>
                    </div>
                </div>
            </Form>

        </React.Fragment>
    )
}
export default SignIn;