import React from 'react';
import { Switch, Route } from 'react-router-dom';

import indexRoutes from '../routes';

const App = () => {
    return (
        <>
            {<Switch>
                {
                    indexRoutes.map((route, key) =>
                        (<Route
                            key={key}
                            path={route.path}
                            exact={route.exact}
                            component={route.component}
                        />
                        ))
                }
            </Switch>}
        </>
    )
};
export default App;