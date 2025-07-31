import {UserBadgeProps} from "@components/UserBadge";

export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const GET_USER_STARTED = "GET_USER_STARTED";
export const GET_AUTHORISED_USER_SUCCESS = "GET_AUTHORISED_USER_SUCCESS";
export const GET_AUTHORISED_USER_FAILED = "GET_AUTHORISED_USER_FAILED";
export const GET_AUTHORISED_USER_STARTED = "GET_AUTHORISED_USER_STARTED";

export interface GetUserSuccessAction {
    type: typeof GET_USER_SUCCESS;
    payload: UserBadgeProps;
}

export interface GetUserFailedAction {
    type: typeof GET_USER_FAILED;
    payload: Error;
}

export interface GetUserStartedAction {
    type: typeof GET_USER_STARTED;
}

export interface GetAuthorisedUserSuccessAction {
    type: typeof GET_AUTHORISED_USER_SUCCESS;
    payload: UserBadgeProps;
}

export interface GetAuthorisedUserFailedAction {
    type: typeof GET_AUTHORISED_USER_FAILED;
    payload: Error;
}

export interface GetAuthorisedUserStartedAction {
    type: typeof GET_AUTHORISED_USER_STARTED;
}

export const getUserSuccess = (user: UserBadgeProps): GetUserSuccessAction => ({
    type: GET_USER_SUCCESS,
    payload: user
});

export const getUserFailed = (error: Error): GetUserFailedAction => ({
    type: GET_USER_FAILED,
    payload: error
});

export const getUserStarted = (): GetUserStartedAction => ({
    type: GET_USER_STARTED
});

export const getAuthorisedUserSuccess = (user: UserBadgeProps): GetAuthorisedUserSuccessAction => ({
    type: GET_AUTHORISED_USER_SUCCESS,
    payload: user
});

export const getAuthorisedUserFailed = (error: Error): GetAuthorisedUserFailedAction => ({
    type: GET_AUTHORISED_USER_FAILED,
    payload: error
});

export const getAuthorisedUserStarted = (): GetAuthorisedUserStartedAction => ({
    type: GET_AUTHORISED_USER_STARTED
});
