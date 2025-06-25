import {AnyAction} from "redux";
import {ThunkAction} from "redux-thunk";
import {api} from "@api/index";
import {RootState} from "../store";
import {CardProps} from "@components/Card";
import {getPhotosStarted, getPhotosSuccess, getPhotosFailed, setPhotosTotal, mutatePhotosSuccess, mutatePhotosFailed, mutatePhotosStarted} from "../actionCreators/photos";

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

export const mutatePhoto = (userId: number, photoId: number): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => {
    return async(dispatch, getState) => {

        dispatch(mutatePhotosStarted());

        const store = getState();
        const photo = store.photos.photos.find(item => item.id === photoId);

        if (!photo) {
            const error = new Error(`Фото с id ${photoId} не найдено`);
            dispatch(mutatePhotosFailed(error));
            return;
        }

        const newPhoto = {
            ...photo,
            likes: [...photo.likes]
        };

        if(newPhoto.likes.includes(userId)) {
            newPhoto.likes = newPhoto.likes.filter(el => el !== userId);
        } else {
            newPhoto.likes.push(userId);
        }

        try {
            const response = await api.users.mutatePhoto({
                data: newPhoto,
                url: `/${photoId}`
            })

            const newPhotos = [...store.photos.photos];
            const photoIndex = newPhotos.findIndex(item => item.id === photoId);

            if (photoIndex !== -1) {
                newPhotos[photoIndex] = response.data;
                dispatch(getPhotosSuccess(newPhotos));
                dispatch(mutatePhotosSuccess());
            } else {
                throw new Error(`Фото с id ${photoId} не найдено в массиве`);
            }
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error : new Error("Неизвестная ошибка");
            dispatch(mutatePhotosFailed(errorMessage));
        }
    }
}
