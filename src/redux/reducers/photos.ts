import {
    GET_PHOTOS_STARTED, GET_PHOTOS_SUCCESS, GET_PHOTOS_FAILED, SET_PHOTOS_TOTAL, MUTATE_PHOTOS_STARTED, MUTATE_PHOTOS_FAILED, MUTATE_PHOTOS_SUCCESS,
    GetPhotosSuccessAction, GetPhotosFailedAction, GetPhotosStartedAction, SetPhotosTotalAction, MutatePhotosSuccessAction, MutatePhotosFailedAction, MutatePhotosStartedAction
} from "../actionCreators/photos";
import {CardProps} from "@components/Card";

type PhotosActionTypes =
    | GetPhotosSuccessAction
    | GetPhotosFailedAction
    | GetPhotosStartedAction
    | SetPhotosTotalAction
    | MutatePhotosSuccessAction
    | MutatePhotosFailedAction
    | MutatePhotosStartedAction;

export interface PhotosState {
    photos: CardProps[];
    isPhotoLoading: boolean;
    totalPhotos: number;
    isMutateLoading: boolean;
}

const initialState: PhotosState = {
    photos: [],
    isPhotoLoading: true,
    totalPhotos: 0,
    isMutateLoading: false
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

        case MUTATE_PHOTOS_STARTED:
            return {
                ...state,
                isMutateLoading: true
            };

        case MUTATE_PHOTOS_FAILED:
            return {
                ...state,
                isMutateLoading: false
            };

        case MUTATE_PHOTOS_SUCCESS:
            return {
                ...state,
                isMutateLoading: false
            };

        default: {
                return {
                    ...state,
                }
            }
    }
}
