import {FC} from "react";
import {useNavigate} from "react-router-dom";
import s from "./UserBadge.module.scss";

export type UserBadgeProps = {
    id: string
    nickname: string
    avatarUrl?: string
    description?: string
    firstName?: string
    lastName?: string
    url?: string
    subscribers?: number[]
    subscribed?: number[]
    isMyPage?: boolean
    isSubscribed?: boolean
}

export const UserBadge:FC<UserBadgeProps> = ({nickname, avatarUrl, id}) => {
    const navigate = useNavigate();

    const onUserBadgeClick = ():void => {
        navigate(`/${id}`);
    }

    return (
        <div className={s["user-badge"]} onClick={onUserBadgeClick}>
            <div className={s["user-badge__logo"]}>
                {avatarUrl ? <img src={avatarUrl} alt={nickname} /> : <div className={s["user-badge__letter"]}>{nickname.charAt(0)}</div>}
            </div>
            {nickname}
        </div>
    )
}
