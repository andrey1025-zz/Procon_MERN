import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import authenticationRoutes from '../routes/authenticationRoutes';
import { TeamLeadRole, TeamMemberRole, SupervisorRole, ProjectManagerRole } from '../enums/roles';

const switchRoutes = (
    <Switch>
        {
            authenticationRoutes.map((route, key) => (
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


const AuthenticationContainer = () => {
    const token = useSelector(state => state.auth.token);
    const user = useSelector(state => state.auth.user);
    const renderRoutes = () => {
        if (token && user && user.role === TeamLeadRole)
            return <Redirect to={`/lead/home`} />
        else if (token && user && user.role === TeamMemberRole)
            return <Redirect to={`/member/home`} />
        else if (token && user && user.role === SupervisorRole)
            return <Redirect to={`/supervisor/welcome`} />
        else if (token && user && user.role === ProjectManagerRole)
            return <Redirect to={`/manager/welcome`} />
        else
            return switchRoutes;
    }

    return (
        <React.Fragment>
            <div className="accountbg"></div>
            <section className="signin">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <div className="logo-login">
                                <img src={require('../images/logo.png')} />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 space-form">
                            {renderRoutes()}
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}
export default AuthenticationContainer;