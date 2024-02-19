import axios from "@/config/axios";
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const loginUser = async (email: string, password: string) => {
    try {
        const res = await axios.post('/auth/login', {
            email,
            password,
        });
        if (res.status === 200 || res.data.message === "success") {
            return {
                token: res.data.token,
            };
        }
    } catch (err: any) {
        console.log('Login error', err);
        const error = err.response.data.message
        toast(`Oops! ${error}`, {
            theme: 'dark',
            type: 'error',
            position: 'top-center',
            dangerouslyHTMLString: true
        })
    }
    return null;
};

export const signUpUser = async (email: string, password: string, name: string, phoneNumber: string) => {
    try {
        const res = await axios.post('/auth/signup', {
            email,
            password,
            name,
            phoneNumber
        });
        if (res.status === 200 || res.data.message === "success") {
            return {
                token: res.data.token,
            };
        }
    } catch (err: any) {
        console.log('SignUp error', err);
        const error = err.response.data.message
        toast(`Oops! ${error}`, {
            theme: 'dark',
            type: 'error',
            position: 'top-center',
            dangerouslyHTMLString: true
        })
    }
    return null;
};