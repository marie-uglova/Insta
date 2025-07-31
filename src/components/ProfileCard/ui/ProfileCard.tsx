import {FC} from "react";
import s from "./ProfileCard.module.scss";
import {CardProps} from "@components/Card";
import {Heart, HeartFill, ChatFill} from "react-bootstrap-icons";

export const ProfileCard:FC<CardProps> = ({
    id,
    author,
    imgUrl,
    isLikedByYou,
    comments,
    likes,
    onLikeClick
}) => {
    return (
        <div className={s["profile-card"]}>
            <div className={s["profile-card__picture"]}>
                <img loading="lazy" src={imgUrl} alt="основное изображение" />
            </div>
            <div className={s["profile-card__row"]}>
                <button className={s["profile-card__like"]} onClick={() => onLikeClick(id)}>
                    {isLikedByYou ? <HeartFill color="red" size={24} /> : <Heart color="red" size={24} />}
                </button>
                {likes.length}
                <ChatFill color="black" size={24} />
                {comments.length}
            </div>
        </div>
    )
}
