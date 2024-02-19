import axios from "@/config/axios";
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const getWeather = async () => {
    try {
        const res = await axios.get('/weather', {
        });
        if (res.status === 200 || res.data.message === "success") {
            return {
                data: res.data.data,
            };
        }
    } catch (err: any) {
        console.log('Weather error', err);
        const error = err.response.data.message
        toast(`Oops!`, {
            theme: 'dark',
            type: 'error',
            position: 'bottom-center',
            dangerouslyHTMLString: true
        })
    }
    return null;
};
