import {
    GET_USER_STARTED, GET_USER_SUCCESS, GET_USER_FAILED, GET_AUTHORISED_USER_STARTED, GET_AUTHORISED_USER_FAILED, GET_AUTHORISED_USER_SUCCESS,
    GetUserSuccessAction, GetUserFailedAction, GetUserStartedAction, GetAuthorisedUserSuccessAction, GetAuthorisedUserFailedAction, GetAuthorisedUserStartedAction,
} from "../actionCreators/users";
import {UserBadgeProps} from "@components/UserBadge";

type UserActionTypes =
    | GetUserSuccessAction
    | GetUserFailedAction
    | GetUserStartedAction
    | GetAuthorisedUserSuccessAction
    | GetAuthorisedUserFailedAction
    | GetAuthorisedUserStartedAction;

export interface UserState {
    user: UserBadgeProps | undefined,
    authorizedUser: UserBadgeProps | undefined,
    isUserLoading: boolean
    isAuthorizedUserLoading: boolean
}

const initialState: UserState = {
    user: undefined,
    authorizedUser: undefined,
    isUserLoading: true,
    isAuthorizedUserLoading: true
}

export const userReducer = (state: UserState = initialState, action: UserActionTypes): UserState => {
    switch (action.type) {
        case GET_USER_STARTED:
            return {
                ...state,
                isUserLoading: true
            };

        case GET_USER_FAILED:
            return {
                ...state,
                isUserLoading: false
            };

        case GET_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isUserLoading: false
            };

        case GET_AUTHORISED_USER_STARTED:
            return {
                ...state,
                isAuthorizedUserLoading: true
            };

        case GET_AUTHORISED_USER_FAILED:
            return {
                ...state,
                isAuthorizedUserLoading: false
            };

        case GET_AUTHORISED_USER_SUCCESS:
            return {
                ...state,
                authorizedUser: action.payload,
                isAuthorizedUserLoading: false
            };

        default: {
            return {
                ...state,
            }
        }
    }
}
