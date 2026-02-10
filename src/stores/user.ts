import { defineStore } from "pinia";
import { ref } from "vue";
import axiosRiksiri from "@/axios/axiosRiksiri";    

export const useUserStore = defineStore('user', () => {

    const token = ref(localStorage.getItem('token') || null);
    const login = ref({
        username: null,
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

    return { login, $login, token }
});