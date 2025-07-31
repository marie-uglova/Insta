import {
    GET_POSTS_FAILED, GET_POSTS_STARTED, GET_POSTS_SUCCESS,
    GetPostsFailedAction, GetPostsSuccessAction, GetPostsStartedAction
} from "@redux/actionCreators/posts";
import {CardProps} from "@components/Card";

type PostsActionTypes =
    | GetPostsSuccessAction
    | GetPostsFailedAction
    | GetPostsStartedAction;

export interface PostsState {
    posts: CardProps[];
    isPostsLoading: boolean;
}

const initialState: PostsState = {
    posts: [],
    isPostsLoading: false
}

export const postsByUserReducer = (state = initialState, action: PostsActionTypes): PostsState => {
    switch (action.type) {
        case GET_POSTS_STARTED:
            return {
                ...state,
                isPostsLoading: true
            };

        case GET_POSTS_SUCCESS:
            return {
                ...state,
                isPostsLoading: false,
                posts: action.payload
            };

        case GET_POSTS_FAILED:
            return {
                ...state,
                isPostsLoading: false
            };

        default:
            return {
                ...state
            };
    }
}
