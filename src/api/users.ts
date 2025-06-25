import {AxiosRequestConfig} from "axios";
import {makeRequest} from "./makeRequest";
import {UserBadgeProps} from "@components/UserBadge";

const USERS_URL = "/users";

export const getUser = (userId: number, config: AxiosRequestConfig) => {
    return makeRequest<UserBadgeProps>({
        method: "GET",
        url: `${USERS_URL}/${userId}`,
        ...config,
    })
};
