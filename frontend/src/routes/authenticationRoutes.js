import SignIn from '../pages/signIn';
import Message from '../pages/message';
import Register from '../pages/register';
import ResetPassword from '../pages/resetPassword';
import ForgetPassword from '../pages/forgetPassword';

const authenticationRoutes = [
    {
        path: '/authentication/sign-in',
        component: SignIn
    },
    {
        path: '/authentication/register',
        component: Register
    },
    {
        path: '/authentication/forget-password',
        component: ForgetPassword
    },
    {
        path: '/authentication/reset-password/:token',
        component: ResetPassword
    },
    {
        path: '/authentication/message',
        component: Message
    }
];
export default authenticationRoutes;