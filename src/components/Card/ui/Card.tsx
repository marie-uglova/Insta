import {FC, useState, useMemo} from "react";
import {sendComment} from "@redux/actions/photos";
import {UserBadge, UserBadgeProps} from "@components/UserBadge";
import {Comment, CommentProps} from "@components/Comment";
import s from "./Card.module.scss";
import {HandThumbsUp, HandThumbsUpFill} from "react-bootstrap-icons";
import {useDispatch, useSelector} from "react-redux";
import {RootState, AppThunkDispatch} from "@redux/store";

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
    const dispatch = useDispatch<AppThunkDispatch>();
    const [isCommentsShown, setIsCommentsShown] = useState(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [comment, setComment] = useState('');
    const authorisedUser = useSelector((state: RootState) => state.users.authorizedUser);

    const visibleComments = useMemo(() => {
        if (comments.length <= 2 || isCommentsShown) {
            return comments;
        }
        return comments.slice(-2);
    }, [comments, isCommentsShown]);

    const hiddenCommentsCount = useMemo(() => {
        return comments.length - visibleComments.length;
    }, [comments.length, visibleComments.length]);

    const handleCommentSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();
        if(comment) {
            onCommentSubmit(id, comment);
            setComment('');
            setIsSubmitDisabled(true);
        }
    };

    const onCommentSubmit = (photoId: number, comment: string) => {
        if (!authorisedUser) {
            console.error('Пользователь не авторизован');
            return;
        }
        dispatch(sendComment(authorisedUser.nickname, photoId, comment));
    }

    const onTextareaChange = (evt: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const newValue = evt.target.value;
        setComment(newValue);
        setIsSubmitDisabled(!newValue.trim());
    }

    return (
        <div className={s["card"]}>

            <UserBadge id={author.id} nickname={author.nickname} avatarUrl={author.avatarUrl} />

            <div className={s["card__picture"]}>
                <img loading="lazy" src={imgUrl} alt="основное изображение" />
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
                    className="btn btn-secondary btn-sm"
                    onClick={() => setIsCommentsShown(true)}
                >
                    {`Показать еще ${hiddenCommentsCount}`}
                </button>
            )}

            <form className={s["card__form"]} onSubmit={handleCommentSubmit}>
                <textarea
                    value={comment}
                    onChange={onTextareaChange}
                    className="form-control"
                    rows={3}
                    placeholder="Комментарий" />
                <button disabled={isSubmitDisabled} type="submit" className="btn btn-dark btn-lg">Отправить</button>
            </form>

        </div>
    )
}
