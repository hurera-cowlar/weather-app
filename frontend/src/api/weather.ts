import axios from "@/config/axios";

export const getWeather = async () => {
    try {
        const res = await axios.get('/weather', {

        });
        if (res.status === 200 || res.data.message === "success") {
            return {
                data: res.data.data,
            };
        }
    } catch (error: any) {
        console.log('Login error', error);
    }
    return null;
};
