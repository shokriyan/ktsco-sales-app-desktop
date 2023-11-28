import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});
class ApiClient<T> {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<T[]>(this.endpoint, config)
      .then((resp) => resp.data);
  };

  get = async (config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<T>(this.endpoint, config)
      .then((resp) => resp.data);
  };

  post = async (request: any, config?: AxiosRequestConfig) => {
    return axiosInstance
      .post<T>(this.endpoint, request, config)
      .then((resp) => resp.data);
  };

  delete = async (config?: AxiosRequestConfig) => {
    return axiosInstance
      .delete<T>(this.endpoint, config)
      .then((resp) => resp.data);
  };
}

export default ApiClient;
