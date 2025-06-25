import {
    GET_USER_STARTED, GET_USER_SUCCESS, GET_USER_FAILED, GET_AUTHORISED_USER_SUCCESS,
    GetUserSuccessAction, GetUserFailedAction, GetUserStartedAction, GetAuthorisedUserSuccessAction
} from "../actionCreators/users";
import {UserBadgeProps} from "@components/UserBadge";

type UserActionTypes =
    | GetUserSuccessAction
    | GetUserFailedAction
    | GetUserStartedAction
    | GetAuthorisedUserSuccessAction;

export interface UserState {
    user: UserBadgeProps | null,
    authorizedUser: UserBadgeProps | undefined,
    isUserLoading: boolean
}

const initialState: UserState = {
    user: null,
    authorizedUser: undefined,
    isUserLoading: false
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

        case GET_AUTHORISED_USER_SUCCESS:
            return {
                ...state,
                authorizedUser: action.payload,
                isUserLoading: false
            };

        default: {
            return {
                ...state,
            }
        }
    }
}
