import axios, {AxiosRequestConfig, AxiosResponse} from "axios";

const BASE_URL = "http://localhost:3000";

export const makeRequest = <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    config.url = `${BASE_URL}${config.url}`;

    return axios(config).catch(error => {
        console.log(error);
        throw error;
    });
}
