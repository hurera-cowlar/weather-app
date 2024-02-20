import axios from 'axios';
import config from './env-config';
console.log(config.BACKEND_URL)
const instance = axios.create({
    baseURL: config.BACKEND_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'

    },
});

export default instance;
