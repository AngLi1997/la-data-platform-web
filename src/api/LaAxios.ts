import axios, { AxiosError, type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";

const service : AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: { "Content-Type": "application/json;charset=UTF-8" }
})

service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    // 这里可以设置token: config!.headers!.Authorization = token
    return config;
});

service.interceptors.response.use((response: AxiosResponse) => {
    const data = response.data;
        if (data.code === 200) {
            return data;
        } else if (data.code === -1) {
            ElMessage.error(data.msg);
            return Promise.reject(response);
        }else {
            return Promise.reject(response);
        }
    }, (error) => {
        return Promise.reject(error.response);
    }
)

const laAxois =  {
    get<T = any>(url: string, data?: any): Promise<T> {
        return laAxois.request("GET", url, { params: data });
    },
    post<T = any>(url: string, data?: any): Promise<T> {
        return laAxois.request("POST", url, { data, headers: { "Content-Type": "application/json"} });
    },
    postFormData<T = any>(url: string, data?: any): Promise<T> {
        return laAxois.request("POST", url, { data, headers: { "Content-Type": "multipart/form-data" } });
    },
    put<T = any>(url: string, data?: any): Promise<T> {
        return laAxois.request("PUT", url, { data });
    },
    delete<T = any>(url: string, data?: any): Promise<T> {
        return laAxois.request("DELETE", url, { params: data });
    },
    request<T = any>(method = "GET", url: string, data?: any): Promise<T> {
        return new Promise((resolve, reject) => {
            service({ method, url, ...data })
                .then((res) => {
                    resolve(res as unknown as Promise<T>);
                })
                .catch((e: Error | AxiosError) => {
                    reject(e);
                })
        });
    }
};

export default laAxois;