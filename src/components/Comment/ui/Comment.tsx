import {FC} from "react";
import s from "./Comment.module.scss";

export type CommentProps = {
    commentId: number
    nickname: string
    text: string
}

export const Comment:FC<CommentProps> = ({commentId, nickname, text}) => {
    return (
        <div className={s["comment"]}>
            <div className={s["comment__name"]}>{nickname}</div>
            {text}
        </div>
    )
}
