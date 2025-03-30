import SignIn from "../components/SignIn.vue"
import SignUp from "../components/SignUp.vue"
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
    }
];

const router = createRouter({
    history : createWebHashHistory(), 
    routes,
});

export default router;

