import {CardProps} from "@components/Card";

export const GET_PHOTOS_SUCCESS = "GET_PHOTOS_SUCCESS";
export const GET_PHOTOS_FAILED = "GET_PHOTOS_FAILED";
export const GET_PHOTOS_STARTED = "GET_PHOTOS_STARTED";
export const SET_PHOTOS_TOTAL = "SET_PHOTOS_TOTAL";
export const MUTATE_PHOTOS_SUCCESS = "MUTATE_PHOTOS_SUCCESS";
export const MUTATE_PHOTOS_FAILED = "MUTATE_PHOTOS_FAILED";
export const MUTATE_PHOTOS_STARTED = "MUTATE_PHOTOS_STARTED";

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

export interface MutatePhotosSuccessAction {
    type: typeof MUTATE_PHOTOS_SUCCESS;
}

export interface MutatePhotosFailedAction {
    type: typeof MUTATE_PHOTOS_FAILED;
    payload: Error;
}

export interface MutatePhotosStartedAction {
    type: typeof MUTATE_PHOTOS_STARTED;
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

export const mutatePhotosSuccess = (): MutatePhotosSuccessAction => ({
    type: MUTATE_PHOTOS_SUCCESS
});

export const mutatePhotosFailed = (error: Error): MutatePhotosFailedAction => ({
    type: MUTATE_PHOTOS_FAILED,
    payload: error
});

export const mutatePhotosStarted = (): MutatePhotosStartedAction => ({
    type: MUTATE_PHOTOS_STARTED
});
