import {FC, useState, useMemo} from "react";
import {UserBadge, UserBadgeProps} from "@components/UserBadge";
import {Comment, CommentProps} from "@components/Comment";
import s from "./Card.module.scss";
import {HandThumbsUp, HandThumbsUpFill} from "react-bootstrap-icons";

export type CardProps = {
    id: number
    author: UserBadgeProps
    imgUrl: string
    isLikedByYou: boolean
    comments: CommentProps[]
    likes: number[]
    onLikeClick: (id: number) => void
}

export const Card:FC<CardProps> = ({id, author, imgUrl, isLikedByYou, comments, likes, onLikeClick}) => {
    const [isCommentsShown, setIsCommentsShown] = useState(false);

    const visibleComments = useMemo(() => {
        if (comments.length <= 2 || isCommentsShown) {
            return comments;
        }
        return comments.slice(-2);
    }, [comments, isCommentsShown]);

    const hiddenCommentsCount = useMemo(() => {
        return comments.length - visibleComments.length;
    }, [comments.length, visibleComments.length]);

    return (
        <div className={s["card"]}>

            <UserBadge userId={author.userId} nickname={author.nickname} avatarUrl={author.avatarUrl} />

            <div className={s["card__picture"]}>
                <img height="300" loading="lazy" src={imgUrl} alt="основное изображение" />
            </div>

            <div className={s["card__likes"]}>
                <button className={s["card__like"]} onClick={() => onLikeClick(id)}>
                    {isLikedByYou ? <HandThumbsUpFill size={30} /> : <HandThumbsUp size={30} />}
                </button>
                {likes.length}
            </div>

            {visibleComments.map(({ commentId, nickname, text }) => (
                <Comment key={commentId} commentId={commentId} nickname={nickname} text={text} />
            ))}

            {!isCommentsShown && comments.length > 2 && (
                <button
                    className="btn btn-primary"
                    onClick={() => setIsCommentsShown(true)}
                >
                    {`Показать еще ${hiddenCommentsCount}`}
                </button>
            )}

        </div>
    )
}
