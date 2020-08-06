import EngineerWelcome from '../pages/engineer';
import EngineerHome from '../pages/engineer/home';
import EngineerNotification from '../pages/engineer/notification';
import ChangePassword from '../pages/changePassword';
import Account from '../pages/account';

const leadRoutes = [
    {
        path: '/engineer/welcome',
        component: EngineerWelcome
    },
    {
        path: '/engineer/home/:id',
        component: EngineerHome
    },
    {
        path: '/engineer/notification',
        component: EngineerNotification
    },
    {
        path: '/engineer/change-password',
        component: ChangePassword
    },
    {
        path: '/engineer/account',
        component: Account
    }
];
export default leadRoutes;