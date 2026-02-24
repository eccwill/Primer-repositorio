import { defineStore } from "pinia";
import { ref } from "vue";
import axiosRiksiri from "@/axios/axiosRiksiri";    

export const useUserStore = defineStore('user', () => {

    const token = ref(localStorage.getItem('token') || null);
    const login = ref({
        username: null,
        password: null  
    })
    const register = ref({
        username: null,
        email: null,
        password: null  
    })
    
    function $login(){
        return axiosRiksiri.post('/login', login.value).then( res => {
            $setLogin(res.data);
            return res.data;
        });
    }

    function $setLogin(data: any | null){
        token.value = data?.token || null;
        if(token.value) {
            localStorage.setItem('token', token.value);
        } else {
            localStorage.removeItem('token');
        }
    }

    function logout(){
        $setLogin(null);
    }

    function $register(){
        return axiosRiksiri.post('/register', register.value).then( res => {
            $setLogin(res.data);
            return res.data;
        });
    }

    return { login, register, $login, $register, token, logout };
});