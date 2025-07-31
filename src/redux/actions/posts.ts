import {api} from "@api/index";
import {ThunkAction} from "redux-thunk";
import {RootState} from "@redux/store";
import {AnyAction} from "redux";
import {getPostsStarted, getPostsSuccess, getPostsFailed} from "@redux/actionCreators/posts";

export const getPostsByUser = (userId: string): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        try{
            dispatch(getPostsStarted());

            const response = await api.posts.getPostsByUser({
                url: `/${userId}`
            });

            dispatch(getPostsSuccess(response.data.posts));
        } catch (error) {
            const errorMessage = error instanceof Error ? error : new Error("Неизвестная ошибка");
            dispatch(getPostsFailed(errorMessage));
        }

    }
}

export const toggleLikeOnPost = (userId: string, postId: string, postAuthorId: string): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => {
    return async (dispatch, getState) => {
        try {
            const posts = getState().posts.posts;

            const newPosts = [...posts];
            const newPostIndex = posts.findIndex(el => el.id === postId);

            if (newPostIndex === -1) {
                const error = new Error(`Фото с id ${postId} не найдено`);

                dispatch(getPostsFailed(error));
                return;
            }

            const postForEdit = {...newPosts[newPostIndex]};

            postForEdit.likes = postForEdit.likes.includes(userId)
                ? postForEdit.likes.filter(el => el !== userId)
                : [...postForEdit.likes, userId];

            newPosts[newPostIndex] = postForEdit;

            await api.posts.mutatePostsByUser({
                url: `/${postAuthorId}`,
                data: {
                    id: postAuthorId,
                    posts: newPosts
                }
            })

            dispatch(getPostsSuccess(newPosts));
        } catch (error) {
            const errorMessage = error instanceof Error ? error : new Error("Неизвестная ошибка");
            dispatch(getPostsFailed(errorMessage));
        }
    }
}
