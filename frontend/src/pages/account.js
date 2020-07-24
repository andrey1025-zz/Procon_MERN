import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { getSimpleRoleName } from '../services';
import { getUserProfile, updateProfile } from '../store/actions/authActions';
import { loadingSelector, errorSelector } from '../store/selectors';
import { Form, SubmitButton, FormField, ErrorMessage, FormTextarea } from '../components/form';
import PhotoUpload from '../components/PhotoUpload';
import history from '../history';

const validationSchema = Yup.object().shape({
    firstName: Yup.string().max(100).required().label("First Name"),
    lastName: Yup.string().max(100).required().label("Last Name"),
    email: Yup.string().email().max(255).required().label("Email"),
    dob: Yup.date().label("Date of Birth"),
    mobile: Yup.string().max(11).label("Mobile"),
    address: Yup.string().max(255).label("Address"),
    experience: Yup.string().max(5000).label("Experience"),
    tempPhotoId: Yup.string().max(255)
});


const initialValues = {
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    mobile: "",
    address: "",
    experience: ""
};

const Account = () => {
    const dispatch = useDispatch();
    const [photo, setPhoto] = useState(null);
    const user = useSelector(state => state.auth.user);
    const profile = useSelector(state => state.auth.profile);
    const tempPhotoId = useSelector(state => state.photo.tempPhotoId);
    const [formInitialValues, setFormInitialValues] = useState(initialValues);
    const errors = useSelector(state => errorSelector(['UPDATE_PROFILE'])(state));
    const loading = useSelector(state => loadingSelector(['UPDATE_PROFILE', 'PHOTO_UPLOAD'])(state));

    const handleSubmit = (data, { setErrors, setSubmitting }) => {
        console.log(data);
        if (tempPhotoId)
            data = { ...data, tempPhotoId };
        dispatch(updateProfile(data, setErrors, setSubmitting));
    }

    useEffect(() => {
        dispatch(getUserProfile());
    }, []);

    useEffect(() => {
        if (profile) {
            const { firstName,
                lastName,
                email,
                mobile,
                dob,
                address,
                experience,
                photo } = profile;
            const htmlDob = dob ? new Date(parseInt(dob.substr(6))) : null;
            setFormInitialValues({
                ...formInitialValues,
                firstName, lastName, email, mobile, dob: htmlDob, address, experience
            });
            if (photo)
                setPhoto(photo);
        }
    }, profile);

    return (
        <div className="col-sm-9 col-xl-9 col-md-9">
            <Form
                initialValues={formInitialValues}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={handleSubmit}
            >
                <div className="profile">
                    <div className="row">
                        <div className="col-sm-6 col-xl-6 col-md-6">
                            <div className="row">
                                <div className="col-sm-4 col-xl-4 col-md-6">
                                    {/* <img className="pic" src={require('../images/users/user.jpg')} /> */}
                                    <PhotoUpload url={photo ? photo : null} />
                                </div>
                                <div className="col-sm-8 col-xl-8 col-md-6">
                                    <p className="c-pic"> Change Picture </p>
                                </div>
                            </div>
                            <div className="info-member">
                                {profile &&
                                    <>
                                        {profile && profile.dob && <p><i className="fa fa-birthday-cake icons-pro" /> {new Date(profile.dob).toLocaleDateString()}</p>}
                                        {profile && profile.email && <p><i className="fa fa-envelope icons-pro" /> {profile.email}</p>}
                                        {profile && profile.mobile && <p><i className="fa fa-mobile-alt icons-pro" /> {profile.mobile}</p>}
                                        {profile && profile.address && <p><i className="fa fa-map-marker-alt icons-pro" /> {profile.address}</p>}
                                        {profile && profile.experience && <p><i className="fa fa-file-alt icons-pro" /> {profile.experience}</p>}

                                    </>
                                }
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-6 col-md-6">
                            <div className="account-form">
                                <div className="form-group row">
                                    <label htmlFor="example-text-input" className="col-sm-12 col-form-label">Name</label>
                                    <div className="col-sm-6">
                                        <FormField
                                            name="firstName"
                                            className="account-fields"
                                            placeholder="First Name"
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        <FormField
                                            name="lastName"
                                            className="account-fields"
                                            placeholder="Last Name"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="example-date-input" className="col-sm-12 col-form-label">Date</label>
                                    <div className="col-sm-12">
                                        <FormField
                                            name="dob"
                                            className="account-fields"
                                            type="date"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-12 pro-fields">
                                        <i className="fa fa-envelope icons-pro" />
                                        <FormField
                                            name="email"
                                            className="account-fields"
                                            type="email"
                                            placeholder="Email"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-12 pro-fields">
                                        <i className="fa fa-mobile-alt icons-pro" />
                                        <FormField
                                            name="mobile"
                                            className="account-fields"
                                            type="tel"
                                            placeholder="Mobile"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-12 pro-fields">
                                        <i className="fa fa-map-marker-alt icons-pro" />
                                        <FormField
                                            name="address"
                                            className="account-fields"
                                            placeholder="Address"
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="pro-fields">
                                        <i className="fa fa-file-alt icons-pro" />
                                        <FormTextarea
                                            name="experience"
                                            className="account-fields"
                                            rows="5"
                                            placeholder="Experience"
                                        />
                                    </div>
                                </div>
                                <ErrorMessage error={errors.fatalError} visible={errors && errors.fatalError} />
                                <button type="button" onClick={() => history.push(`/${getSimpleRoleName(user.role)}/change-password`)} className="btn btn-info btn-lg waves-effect waves-light task-btn3 float-left">Change password</button>
                                <SubmitButton title={'Save'} className="btn btn-info btn-lg waves-effect waves-light task-btn2 float-right" loading={loading} disabled={loading} />
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    )
}
export default Account;