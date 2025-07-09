import {CardProps} from "@components/Card";

export const GET_PHOTOS_SUCCESS = "GET_PHOTOS_SUCCESS";
export const GET_PHOTOS_FAILED = "GET_PHOTOS_FAILED";
export const GET_PHOTOS_STARTED = "GET_PHOTOS_STARTED";
export const SET_PHOTOS_TOTAL = "SET_PHOTOS_TOTAL";
export const MUTATE_POSTS_SUCCESS = "MUTATE_POSTS_SUCCESS";
export const MUTATE_POSTS_FAILED = "MUTATE_POSTS_FAILED";
export const MUTATE_POSTS_STARTED = "MUTATE_POSTS_STARTED";

export interface GetPhotosSuccessAction {
    type: typeof GET_PHOTOS_SUCCESS;
    payload: CardProps[];
}

export interface GetPhotosFailedAction {
    type: typeof GET_PHOTOS_FAILED;
    payload: Error;
}

export interface GetPhotosStartedAction {
    type: typeof GET_PHOTOS_STARTED;
}

export interface SetPhotosTotalAction {
    type: typeof SET_PHOTOS_TOTAL;
    payload: number;
}

export interface MutatePostsSuccessAction {
    type: typeof MUTATE_POSTS_SUCCESS;
}

export interface MutatePostsFailedAction {
    type: typeof MUTATE_POSTS_FAILED;
    payload: Error;
}

export interface MutatePostsStartedAction {
    type: typeof MUTATE_POSTS_STARTED;
}

export const getPhotosSuccess = (photos: CardProps[]): GetPhotosSuccessAction => ({
    type: GET_PHOTOS_SUCCESS,
    payload: photos
});

export const getPhotosFailed = (error: Error): GetPhotosFailedAction => ({
    type: GET_PHOTOS_FAILED,
    payload: error
});

export const getPhotosStarted = (): GetPhotosStartedAction => ({
    type: GET_PHOTOS_STARTED
});

export const setPhotosTotal = (total: number): SetPhotosTotalAction => ({
    type: SET_PHOTOS_TOTAL,
    payload: total
});

export const mutatePostsSuccess = (): MutatePostsSuccessAction => ({
    type: MUTATE_POSTS_SUCCESS
});

export const mutatePostsFailed = (error: Error): MutatePostsFailedAction => ({
    type: MUTATE_POSTS_FAILED,
    payload: error
});

export const mutatePostsStarted = (): MutatePostsStartedAction => ({
    type: MUTATE_POSTS_STARTED
});
