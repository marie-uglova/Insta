import {combineReducers} from "redux";
import {photosReducer} from "./photos";
import {userReducer} from "./users";
import {postsByUserReducer} from "./posts";

export const rootReducer = combineReducers({
    photos: photosReducer,
    users: userReducer,
    posts: postsByUserReducer
})
