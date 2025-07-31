import {CardProps} from "@components/Card";

export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
export const GET_POSTS_FAILED = "GET_POSTS_FAILED";
export const GET_POSTS_STARTED = "GET_POSTS_STARTED";

export interface GetPostsSuccessAction {
    type: typeof GET_POSTS_SUCCESS;
    payload: CardProps[];
}

export interface GetPostsFailedAction {
    type: typeof GET_POSTS_FAILED;
    payload: Error;
}

export interface GetPostsStartedAction {
    type: typeof GET_POSTS_STARTED;
}

export const getPostsSuccess = (posts: CardProps[]): GetPostsSuccessAction => ({
    type: GET_POSTS_SUCCESS,
    payload: posts
});

export const getPostsFailed = (error: Error): GetPostsFailedAction => ({
    type: GET_POSTS_FAILED,
    payload: error
});

export const getPostsStarted = (): GetPostsStartedAction => ({
    type: GET_POSTS_STARTED
});
