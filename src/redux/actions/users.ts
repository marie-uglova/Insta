import {AnyAction} from "redux";
import {ThunkAction} from "redux-thunk";
import {api} from "@api/index";
import {RootState} from "../store";
import {getUserStarted, getUserFailed, getUserSuccess, getAuthorisedUserStarted, getAuthorisedUserFailed, getAuthorisedUserSuccess} from "../actionCreators/users";

export const getUser = (id: string): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => {
    return async(dispatch) => {
        try {
            dispatch(getUserStarted());

            const response = await api.users.getUser(id, {
                params: {
                    _limit: 1
                }
            });

            dispatch(getUserSuccess(response.data));
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error : new Error("Неизвестная ошибка");
            dispatch(getUserFailed(errorMessage));
        }
    }
}

export const getAuthorisedUser = (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => {
    return async(dispatch) => {
        try {
            dispatch(getAuthorisedUserStarted());

            const response = await api.users.getUser('1', {
                params: {
                    _limit: 1
                }
            });

            dispatch(getAuthorisedUserSuccess(response.data));
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error : new Error("Неизвестная ошибка");
            dispatch(getAuthorisedUserFailed(errorMessage));
        }
    }
}
