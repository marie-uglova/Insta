import {AxiosRequestConfig, AxiosResponse} from "axios";
import {getPhotos, mutatePhoto} from "./photos";
import {getUser} from "./users";
import {CardProps} from "@components/Card";
import {UserBadgeProps} from "@components/UserBadge";

export interface Api {
    photos: {
        getPhotos: (config: AxiosRequestConfig) => Promise<AxiosResponse<CardProps[]>>;
    };
    users: {
        getUser: (userId: number, config: AxiosRequestConfig) => Promise<AxiosResponse<UserBadgeProps>>;
        mutatePhoto: (config: AxiosRequestConfig) => Promise<AxiosResponse<CardProps>>;
    };
}

export const api: Api = {
    photos: {
        getPhotos
    },
    users: {
        getUser,
        mutatePhoto
    }
}
