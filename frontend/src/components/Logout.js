import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { FaSpin } from '../components/FaSpin';
import { getSimpleRoleName } from '../services';
import { loadingSelector } from '../store/selectors';
import { logout } from '../store/actions/authActions';

const Logout = () => {
    const loading = useSelector(state => loadingSelector(['LOGOUT'])(state));
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    return (
        <>
            <button disabled={loading} onClick={() => dispatch(logout())} className="submit-button btn-block waves-effect waves-light m-t-30">
                {loading ? <FaSpin /> : "LOGOUT"}
            </button>
            <Link to={`/${getSimpleRoleName(user.role)}/change-password`} className="btn btn-info btn-lg waves-effect waves-light task-btn2 m-t-30">
                CHANGE PASSWORD
            </Link>
        </>
    )
}
export default Logout;