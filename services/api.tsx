import axios from "axios";

export const API = axios.create({
    baseURL: "https://LINKAPI",
    headers: {
        "Content-type": "application/json",
        "Authorization": "TOKEN..."
    },
});
