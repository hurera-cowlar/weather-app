import axios from "@/config/axios";

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
    } catch (error: any) {
        console.log('Login error', error);
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
    } catch (error: any) {
        console.log('SignUp error', error);
    }
    return null;
};