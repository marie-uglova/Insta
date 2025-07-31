import {AxiosRequestConfig, AxiosResponse} from "axios";
import {getPhotos, mutatePosts} from "./photos";
import {getUser} from "./users";
import {getPostsByUser, mutatePostsByUser, PostsResponse} from "./posts";
import {CardProps} from "@components/Card";
import {UserBadgeProps} from "@components/UserBadge";

export interface Api {
    photos: {
        getPhotos: (config: AxiosRequestConfig) => Promise<AxiosResponse<CardProps[]>>;
    };
    users: {
        getUser: (id: string, config: AxiosRequestConfig) => Promise<AxiosResponse<UserBadgeProps>>;
        mutatePosts: (config: AxiosRequestConfig) => Promise<AxiosResponse<CardProps>>;
    };
    posts: {
        getPostsByUser: (config: AxiosRequestConfig) => Promise<AxiosResponse<PostsResponse>>;
        mutatePostsByUser: (config: AxiosRequestConfig) => Promise<AxiosResponse<PostsResponse>>;
    }
}

export const api: Api = {
    photos: {
        getPhotos
    },
    users: {
        getUser,
        mutatePosts
    },
    posts: {
        getPostsByUser,
        mutatePostsByUser
    }
}
