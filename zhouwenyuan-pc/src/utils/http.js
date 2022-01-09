import axios from "axios";

let instance = axios.create();

// 请求拦截器
instance.interceptors.request.use(
    config => {
        //   请求的基准url路径
        config.baseURL =
            "http://localhost:3000";
        //   请求的token信息
        config.headers.authorization = "xxxx";
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default instance;