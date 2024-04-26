import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_API_URL } = getEnvVariables();

const paqueteriaApi = axios.create({
    baseURL: VITE_API_URL,
});

paqueteriaApi.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        "Content-Type": "application/json",
    };

    return config;
});

export default paqueteriaApi;
