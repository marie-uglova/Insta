import {FC, useEffect, useState, CSSProperties } from "react";
import {AnyAction} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {useDispatch, useSelector} from "react-redux";
import {Layout} from "@components/Layout";
import {Card} from "@components/Card";
import {getPhotos, toggleLike} from "@redux/actions/photos";
import InfiniteScroll from "react-infinite-scroll-component";
import {ClipLoader} from "react-spinners";
import {RootState} from "@redux/store";

const loaderOverride: CSSProperties = {
    display: "block",
    margin: "0 auto"
};

type LoaderProps = React.ComponentProps<typeof ClipLoader>;

const Loader = ({color = "red", size = 100, ...rest}: LoaderProps) => (
    <ClipLoader
        color={color}
        size={size}
        cssOverride={loaderOverride}
        {...rest}
    />
);

export const MainPage: FC = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
    const photos = useSelector((state: RootState) => state.photos.photos);
    const loading = useSelector((state: RootState) => state.photos.isPhotoLoading);
    const total = useSelector((state: RootState) => state.photos.totalPhotos);
    const authorisedUser = useSelector((state: RootState) => state.users.authorizedUser);

    let [page, setPage] = useState(1);

    const nextHandler = (): void => {
        setPage(prevPage => prevPage + 1);
    }

    const onLikeClick = (photoId: number): void => {
        if (!authorisedUser) return;
        dispatch(toggleLike(authorisedUser.id, photoId));
    }

    useEffect(() => {
        dispatch(getPhotos(page));
    }, [page, dispatch]);

    if (!authorisedUser) {
        return (
            <div className="container">
                <h2>Пожалуйста, авторизуйтесь</h2>
            </div>
        );
    }

    return (
        <Layout nickname={authorisedUser.nickname} id={authorisedUser.id} avatarUrl={authorisedUser.avatarUrl}>
            <div className="container">
                {loading ? <Loader color="green" /> : <InfiniteScroll
                    dataLength={photos.length}
                    next={nextHandler}
                    hasMore={photos.length < total}
                    loader={<Loader color="black" size="50px" />}>
                        {photos.map(({id, imgUrl, author, comments, likes}) => (
                            <Card
                                key={id}
                                id={id}
                                author={author}
                                imgUrl={imgUrl}
                                likes={likes}
                                isLikedByYou={likes.includes(authorisedUser.id)}
                                comments={comments}
                                onLikeClick={onLikeClick} />
                        ))}
                </InfiniteScroll>}
            </div>
        </Layout>
    )
}
