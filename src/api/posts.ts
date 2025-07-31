import {AxiosRequestConfig} from "axios";
import {makeRequest} from "./makeRequest";
import {CardProps} from "@components/Card";

const POSTS_URL = "/postsByUser";

export interface PostsResponse {
    posts: CardProps[];
}

export const getPostsByUser = (config: AxiosRequestConfig) => {
    const {url, ...restConfig} = config;

    return makeRequest<PostsResponse>({
        method: "GET",
        url: `${POSTS_URL}${url}`,
        ...restConfig,
    })
};

export const mutatePostsByUser = (config: AxiosRequestConfig) => {
    const {url, ...restConfig} = config;

    return makeRequest<PostsResponse>({
        method: "PUT",
        url: `${POSTS_URL}${url}`,
        ...restConfig,
    })
};
