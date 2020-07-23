import LeadHome from '../pages/lead';
import ChangePassword from '../pages/changePassword';
import Account from '../pages/account';

const leadRoutes = [
    {
        path: '/lead/home',
        component: LeadHome
    },
    {
        path: '/lead/change-password',
        component: ChangePassword
    },
    {
        path: '/lead/account',
        component: Account
    }
];
export default leadRoutes;