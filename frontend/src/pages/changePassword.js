import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { getSimpleRoleName } from '../services';
import { changePassword } from '../store/actions/authActions';
import { loadingSelector, errorSelector } from '../store/selectors';
import { Form, SubmitButton, FormField, ErrorMessage } from '../components/form';

const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required().min(6).max(255).label("Old Password"),
    newPassword: Yup.string().required().min(6).max(255).label("New Password"),
    reEnterPassword: Yup.string().equals([Yup.ref('newPassword')], "Password and Repeat Password must match").required().min(6).max(255).label("Repeat Password"),
});

const initialValues = {
    oldPassword: "",
    newPassword: "",
    reEnterPassword: ""
};

const ChangePassword = () => {
    const loading = useSelector(state => loadingSelector(['CHANGE_PASSWORD'])(state));
    const errors = useSelector(state => errorSelector(['CHANGE_PASSWORD'])(state));
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const handleSubmit = (data, { setErrors, setSubmitting }) => {
        dispatch(changePassword(data, setErrors, setSubmitting, `/${getSimpleRoleName(user.role)}/account`));
    }

    return (
        <div class="col-sm-6 col-xl-6 col-md-6 offset-3">
            <div class="profile text-center">
                <h1>Change Password</h1>
                <Form class="account-form"
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    initialValues={initialValues}
                >
                    <div class="form-group row">
                        <div class="col-sm-12">
                            <FormField name="oldPassword" className="account-fields" type="password" placeholder="Enter old Password" />
                        </div>
                    </div>
                    <div class="form-group row">

                        <div class="col-sm-12">
                            <FormField name="newPassword" className="account-fields" type="password" placeholder="Enter new Password" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-12">
                            <FormField name="reEnterPassword" className="account-fields" type="password" placeholder="Enter Repeat Password" />
                        </div>
                    </div>
                    <ErrorMessage error={errors.fatalError} visible={errors && errors.fatalError} />
                    <SubmitButton title="Change Password" loading={loading} disabled={loading} className="btn btn-info btn-lg waves-effect waves-light task-btn2" />
                </Form>
            </div>
        </div>
    )
};
export default ChangePassword;