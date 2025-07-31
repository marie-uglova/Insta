import {FC, useEffect} from "react";
import {Layout} from "@components/Layout";
import {UserLargeBadge} from "@components/UserLargeBadge";
import {ProfileCard} from "@components/ProfileCard";
import {useDispatch, useSelector} from "react-redux";
import {AppThunkDispatch, RootState} from "@redux/store";
import {toggleLikeOnPost} from "@redux/actions/posts";
import {getUser} from "@redux/actions/users";
import {getPostsByUser} from "@redux/actions/posts";
import {useParams} from "react-router-dom";
import s from "./UserPage.module.scss";

export const UserPage: FC = () => {
    const dispatch = useDispatch<AppThunkDispatch>();
    const {id} = useParams();
    const {user, authorizedUser, isUserLoading, isAuthorizedUserLoading} = useSelector((state: RootState) => state.users);
    const {posts, isPostsLoading} = useSelector((state: RootState) => state.posts);

    useEffect(() => {
        if(id) {
            dispatch(getPostsByUser(id));
            dispatch(getUser(id));
        }
    }, [dispatch, id]);

    if (!authorizedUser) {
        return (
            <div className="container">
                <h2>Пожалуйста, авторизуйтесь</h2>
            </div>
        );
    }

    if (isUserLoading) {
        return <div>Загрузка данных пользователя...</div>;
    }

    if (!user) {
        return <div>Пользователь не найден</div>;
    }

    const onLikeClick = (photoId: string) => {
        if(id) {
            dispatch(toggleLikeOnPost(authorizedUser.id, photoId, id));
        }
    }

    return (
        <Layout id={authorizedUser.id} nickname={authorizedUser.nickname} avatarUrl={authorizedUser.avatarUrl}>
            <div className={s["user-page"]}>
                <UserLargeBadge
                    id={user.id}
                    nickname={user.nickname}
                    description={user.description}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    url={user.url}
                    subscribers={user.subscribers}
                    subscribed={user.subscribed}
                    avatarUrl={user.avatarUrl}
                    isMyPage={id === authorizedUser.id}
                    isSubscribed={user.subscribers?.includes(authorizedUser.id)}
                />


                <div className="container">
                    <div className={s["user-page__grid"]}>
                        {posts.length ? posts.map(({id, author, imgUrl, comments, likes}) =>
                                <ProfileCard
                                    key={id}
                                    id={id}
                                    imgUrl={imgUrl}
                                    author={author}
                                    comments={comments}
                                    likes={likes}
                                    isLikedByYou={likes.includes(authorizedUser.id)}
                                    onLikeClick={() => onLikeClick(id)}/>
                            ) : 'у пользователя нет постов'}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
