import SupervisorWelcome from '../pages/supervisor';
import ChangePassword from '../pages/changePassword';
import Account from '../pages/account';

const supervisorRoutes = [
    {
        path: '/supervisor/welcome',
        component: SupervisorWelcome
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