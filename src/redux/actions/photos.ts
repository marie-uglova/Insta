import {AnyAction} from "redux";
import {ThunkAction} from "redux-thunk";
import {api} from "@api/index";
import {RootState} from "../store";
import {CardProps} from "@components/Card";
import {getPhotosStarted, getPhotosSuccess, getPhotosFailed, setPhotosTotal, mutatePostsSuccess, mutatePostsFailed, mutatePostsStarted} from "../actionCreators/photos";
import {getPhotoFromState, getUpdatedPhoto} from "@redux/utils";
import {nanoid} from "nanoid";

export const getPhotos = (page: number = 1): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => {
    return async(dispatch, getState) => {
        try {
            const store = getState();

            if(page === 1) {
                dispatch(getPhotosStarted());
            }

            const response = await api.photos.getPhotos({
                params: {
                    _page: page,
                    _limit: 5
                }
            })

            const photos: CardProps[] = response.data;
            const totalCount: number = parseInt(response.headers["x-total-count"], 10);
            const currentPhotos: CardProps[] = (store as RootState).photos.photos;

            if(page === 1) {
                dispatch(setPhotosTotal(totalCount));
                dispatch(getPhotosSuccess([...photos]));
            } else {
                dispatch(getPhotosSuccess([...currentPhotos, ...photos]));
            }

        }
        catch (error) {
            const errorMessage = error instanceof Error ? error : new Error("Неизвестная ошибка");
            dispatch(getPhotosFailed(errorMessage));
        }
    }
}

export const toggleLike = (id: string, photoId: string): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => {
    return async(dispatch, getState) => {

        dispatch(mutatePostsStarted());

        const store = getState();
        const newPhoto = getPhotoFromState(store.photos.photos, photoId);

        if (!newPhoto) {
            const error = new Error(`Фото с id ${photoId} не найдено`);

            dispatch(mutatePostsFailed(error));
            return;
        }

        if(newPhoto.likes.includes(id)) {
            newPhoto.likes = newPhoto.likes.filter(el => el !== id);
        } else {
            newPhoto.likes.push(id);
        }

        try {
            const response = await api.users.mutatePosts({
                data: newPhoto,
                url: `/${photoId}`
            })

            const newPhotos = getUpdatedPhoto(store.photos.photos, photoId, response.data);

            dispatch(getPhotosSuccess(newPhotos));
            dispatch(mutatePostsSuccess());
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error : new Error("Неизвестная ошибка");
            dispatch(mutatePostsFailed(errorMessage));
        }
    }
}

export const sendComment = (nickname: string, photoId: string, text: string): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState) => {

        dispatch(mutatePostsStarted());

        const store = getState();
        const newPhoto = getPhotoFromState(store.photos.photos, photoId);
        const commentId = nanoid();

        if (!newPhoto) {
            dispatch(mutatePostsFailed(new Error("Фото не найдено")));
            return;
        }

        newPhoto.comments.push({commentId, nickname, text});

        try {
            await api.users.mutatePosts({
                data: newPhoto,
                url: `/${photoId}`
            });
            dispatch(mutatePostsSuccess());
        } catch (error) {
            const errorMessage = error instanceof Error ? error : new Error("Неизвестная ошибка");
            dispatch(mutatePostsFailed(errorMessage));
        }

    }
}
