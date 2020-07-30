import SupervisorWelcome from '../pages/supervisor';
import SupervisorHome from '../pages/supervisor/home';
import ChangePassword from '../pages/changePassword';
import Account from '../pages/account';

const supervisorRoutes = [
    {
        path: '/supervisor/welcome',
        component: SupervisorWelcome
    },
    {
        path: '/supervisor/home/:id',
        component: SupervisorHome
    },
    {
        path: '/supervisor/change-password',
        component: ChangePassword
    },
    {
        path: '/supervisor/account',
        component: Account
    }
];
export default supervisorRoutes;