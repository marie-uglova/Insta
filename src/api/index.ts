import {AxiosRequestConfig, AxiosResponse} from "axios";
import {getPhotos, mutatePosts} from "./photos";
import {getUser} from "./users";
import {CardProps} from "@components/Card";
import {UserBadgeProps} from "@components/UserBadge";

export interface Api {
    photos: {
        getPhotos: (config: AxiosRequestConfig) => Promise<AxiosResponse<CardProps[]>>;
    };
    users: {
        getUser: (id: number, config: AxiosRequestConfig) => Promise<AxiosResponse<UserBadgeProps>>;
        mutatePosts: (config: AxiosRequestConfig) => Promise<AxiosResponse<CardProps>>;
    };
}

export const api: Api = {
    photos: {
        getPhotos
    },
    users: {
        getUser,
        mutatePosts
    }
}
