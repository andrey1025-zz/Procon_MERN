import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { loadingSelector, errorSelector } from '../store/selectors';
import { EngineerRole, MemberRole, SupervisorRole, ProjectManagerRole } from '../enums/roles';
import { Form, SubmitButton, FormField, FormSelect, ErrorMessage } from '../components/form';
import { register } from '../store/actions/authActions';

const validationSchema = Yup.object().shape({
    firstName: Yup.string().max(100).required().label("First Name"),
    lastName: Yup.string().max(100).required().label("Last Name"),
    email: Yup.string().email().max(255).required().label("Email"),
    password: Yup.string().required().min(6).max(255).label("Password"),
    reEnterPassword: Yup.string().equals([Yup.ref('password')], "Password and Repeat Password must match").required().min(6).max(255).label("Repeat Password"),
    role: Yup.string().required().label("role")
});

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    reEnterPassword: "",
    role: ""
};

const Register = () => {
    const loading = useSelector(state => loadingSelector(['REGISTER'])(state));
    const errors = useSelector(state => errorSelector(['REGISTER'])(state));
    const dispatch = useDispatch();
    const handleSubmit = (data, { setErrors, setSubmitting }) => {
        dispatch(register(data, setErrors, setSubmitting));
    }

    return (
        <React.Fragment>
            <h1 className="text-center white">Register</h1>
            <Form
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                initialValues={initialValues}
                className="form-horizontal m-t-30">
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-6 p-0 p-right">
                            <FormField name="firstName" placeholder="First Name" />
                        </div>
                        <div className="col-sm-6 p-0 p-left">
                            <FormField name="lastName" placeholder="Last Name" />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <FormField name="email" placeholder="Email" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <FormSelect name="role">
                            <option value={SupervisorRole}>{SupervisorRole}</option>
                            <option value={ProjectManagerRole}>{ProjectManagerRole}</option>
                            <option value={EngineerRole}>{EngineerRole}</option>
                            <option value={MemberRole}>{MemberRole}</option>
                        </FormSelect>
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
                            <SubmitButton title='Register' loading={loading} disabled={loading} />
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
export default Register;