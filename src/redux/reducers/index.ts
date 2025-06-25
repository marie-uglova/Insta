import {combineReducers} from "redux";
import {photosReducer} from "./photos";
import {userReducer} from "./users";

export const rootReducer = combineReducers({
    photos: photosReducer,
    users: userReducer
})
