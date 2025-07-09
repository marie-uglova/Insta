import {
    GET_PHOTOS_STARTED, GET_PHOTOS_SUCCESS, GET_PHOTOS_FAILED, SET_PHOTOS_TOTAL, MUTATE_POSTS_STARTED, MUTATE_POSTS_FAILED, MUTATE_POSTS_SUCCESS,
    GetPhotosSuccessAction, GetPhotosFailedAction, GetPhotosStartedAction, SetPhotosTotalAction, MutatePostsSuccessAction, MutatePostsFailedAction, MutatePostsStartedAction
} from "../actionCreators/photos";
import {CardProps} from "@components/Card";

type PhotosActionTypes =
    | GetPhotosSuccessAction
    | GetPhotosFailedAction
    | GetPhotosStartedAction
    | SetPhotosTotalAction
    | MutatePostsSuccessAction
    | MutatePostsFailedAction
    | MutatePostsStartedAction;

export interface PhotosState {
    photos: CardProps[];
    isPhotoLoading: boolean;
    totalPhotos: number;
    isMutatePostsLoading: boolean;
}

const initialState: PhotosState = {
    photos: [],
    isPhotoLoading: true,
    totalPhotos: 0,
    isMutatePostsLoading: false
}

export const photosReducer = (state: PhotosState = initialState, action: PhotosActionTypes): PhotosState => {
    switch (action.type) {
        case GET_PHOTOS_STARTED:
            return {
                ...state,
                isPhotoLoading: true
            };

        case GET_PHOTOS_FAILED:
            return {
                ...state,
                isPhotoLoading: false
            };

        case GET_PHOTOS_SUCCESS:
            return {
                ...state,
                photos: action.payload,
                isPhotoLoading: false
            };

        case SET_PHOTOS_TOTAL:
            return {
                ...state,
                totalPhotos: action.payload
            };

        case MUTATE_POSTS_STARTED:
            return {
                ...state,
                isMutatePostsLoading: true
            };

        case MUTATE_POSTS_FAILED:
            return {
                ...state,
                isMutatePostsLoading: false
            };

        case MUTATE_POSTS_SUCCESS:
            return {
                ...state,
                isMutatePostsLoading: false
            };

        default: {
                return {
                    ...state,
                }
            }
    }
}
