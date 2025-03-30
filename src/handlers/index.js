import SignIn from "../components/SignIn.vue"
import SignUp from "../components/SignUp.vue"
import Connected from "../components/Connected.vue"
import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    {
        name : 'Home',
        path : '/',
        redirect : '/signin'
    },
    {
        name : 'SignIn',
        path : '/signin',
        component : SignIn
    },
    {
        name : 'SignUp',
        path : '/signup',
        component : SignUp
    },
    {
        name : 'Connected',
        path : '/connected',
        component : Connected
    }
];

const router = createRouter({
    history : createWebHashHistory(), 
    routes,
});

export default router;

