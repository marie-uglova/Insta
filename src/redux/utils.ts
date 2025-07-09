import {CardProps} from "@components/Card";

export const getPhotoFromState = (photos: CardProps[], photoId: number): CardProps | undefined => {
    const photo = photos.find(item => item.id === photoId);

    return photo ? { ...photo, likes: [...photo.likes] } : undefined;
}

export const getUpdatedPhoto = (photos: CardProps[], photoId: number, data: CardProps): CardProps[] => {
    const newPhotos = [...photos];
    const photoIndex = newPhotos.findIndex(item => item.id === photoId);

    if (photoIndex === -1) return photos;

    newPhotos[photoIndex] = data;

    return newPhotos;
}
