import axios from "axios";

const api = axios.create({
  baseURL: "https://689f09763fed484cf878d167.mockapi.io/api/v1",   //https://689f09763fed484cf878d167.mockapi.io/api/v1/task
  timeout: 10000   //it's mili seconds(ms)
});

api.interceptors.request.use(async (config) => {
    // You can add any custom headers or modify the request config here
    //config.headers.Authorization = `Bearer ${token}`; // Assuming you have a global token variable
    return config;
});

api.interceptors.response.use(async (config) => {
    // You can add any custom headers or modify the request config here
    //config.headers.Authorization = `Bearer ${token}`; // Assuming you have a global token variable
    return config;
});

export default api;
