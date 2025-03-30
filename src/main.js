import {createApp} from "vue"
import router from "./handlers/index.js"

import 'uno.css'
import App from './App.vue'

createApp(App)
.use(router)
.mount('#app')

// const radioButtons = document.querySelectorAll('[name="formType"]')

// const signupFormEl = document.querySelector("#signup")
// const loginFormEl = document.querySelector("#login")

// function displayAppropriateForm(event){
//     if(event.target.checked){
//         if(event.target.value =='login'){
//             signupFormEl.style.display = 'none'
//             loginFormEl.style.display = ''
//             return
//         }
//         loginFormEl.style.display = 'none'
//         signupFormEl.style.display = ''
//     }
// }


// for (const radioButton of radioButtons) {
//     radioButton.addEventListener('change', displayAppropriateForm)
// }


// if (signupFormEl) {
//     signupFormEl.addEventListener('submit', SignUp)
// }

// if (loginFormEl) {
//     loginFormEl.addEventListener('submit', LogIn)
// }
