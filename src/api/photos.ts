import {AxiosRequestConfig} from "axios";
import {makeRequest} from "./makeRequest";
import {CardProps} from "@components/Card";

const PHOTOS_URL = "/posts";

export const getPhotos = (config: AxiosRequestConfig) => {
    return makeRequest<CardProps[]>({
        method: "GET",
        url: PHOTOS_URL,
        ...config,
    })
};

export const mutatePosts = (config: AxiosRequestConfig) => {
    const {url, ...restConfig} = config;

    return makeRequest<CardProps>({
        method: "PUT",
        url: `${PHOTOS_URL}${url}`,
        ...restConfig,
    })
};
