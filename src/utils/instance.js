import axios from "axios";
import { BASE_URL } from "../consts/url";
import storage from "./storage";

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 500
})

instance.interceptors.request.use(
    async (config) => {

        const token = await storage.getItem("token","");

        if (token) {
            config.headers.authorization = JSON.parse(token)
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;