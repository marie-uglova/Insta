import {applyMiddleware, createStore} from "redux";
import {thunk, ThunkDispatch} from "redux-thunk";
import {AnyAction} from 'redux';
import {rootReducer} from "./reducers";

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
export type RootState = ReturnType<typeof rootReducer>;
