import SignIn from "../components/SignIn.vue"
import SignUp from "../components/SignUp.vue"
import Ingredients from "../components/ingredients.vue"
import config from '../config.js';
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
        name : 'Ingredients',
        path : '/ingredients',
        component : Ingredients,
        meta: { requiresAuth: true }
    }
];

const router = createRouter({
    history : createWebHashHistory(), 
    routes,
});

router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem('authToken');
    
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!token) {
            return next('/signin');
        }

        try {
            const response = await fetch(`${config.apiBaseURL}/api/verify-token`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                return next();
            } else {
                localStorage.removeItem('authToken');
                return next('/signin');
            }
        } catch (error) {
            console.error("Error during token verification:", error);
            localStorage.removeItem('authToken');
            return next('/signin');
        }
    }

    next();
});



export default router;

