import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import { EngineerRole } from '../enums/roles';
import leadRoutes from '../routes/leadRoutes';
import TopNavbar from '../components/layout/TopNavbar';
import SideMenu from '../components/layout/SideMenu';

const switchRoutes = (
    <Switch>
        {
            leadRoutes.map((route, key) => (
                <Route
                    key={key}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                />
            ))
        }
    </Switch>
);

const EngineerContainer = () => {
    const token = useSelector(state => state.auth.token);
    const user = useSelector(state => state.auth.user);
    return (
        <div id="wrapper">
            {user && <TopNavbar />}
            {user && <SideMenu />}
            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">
                        <div className="row space-top"></div>
                        {token && user && user.role === EngineerRole ? switchRoutes : <Redirect to={`/authentication/sign-in`} />}
                    </div>
                </div>
            </div>
        </div >
    );
}
export default EngineerContainer;