import {FC, useEffect, useState} from "react";
import s from "./UserLargeBadge.module.scss";
import {UserBadgeProps} from "@components/UserBadge";

export const UserLargeBadge:FC<UserBadgeProps> = ({
    nickname,
    avatarUrl,
    description,
    firstName,
    lastName,
    url,
    subscribers,
    subscribed,
    isMyPage,
    isSubscribed
}) => {
    const [btnProps, setBtnProps] = useState({onClick: () => false, children: "Подписаться"});

    useEffect(() => {
        if(isMyPage) {
            setBtnProps({onClick: () => false, children: "Редактировать"});
        } else if(isSubscribed) {
            setBtnProps({onClick: () => false, children: "Отписаться"});
        } else {
            setBtnProps({onClick: () => false, children: "Подписаться"});
        }
    }, [isMyPage, isSubscribed]);

    return (
        <div className={s["user-large-badge"]}>
            <div className={s["user-large-badge__logo"]}>
                {avatarUrl ? <img src={avatarUrl} alt={nickname} /> : <div className={s["user-badge__letter"]}>{nickname.charAt(0)}</div>}
            </div>
            <div className={s["user-large-badge__cell"]}>
                <div className={s["user-large-badge__name"]}>
                    {nickname}
                </div>
                <div className={s["user-large-badge__row"]}>
                    {firstName} {lastName}
                </div>
                <div className={s["user-large-badge__row"]}>
                    {description}
                </div>
                <a href={url}>
                    {url}
                </a>
                <div className={s["user-large-badge__row"]}>
                    Подписчиков:
                    <div>{subscribers?.length}</div>
                </div>
                <div className={s["user-large-badge__row"]}>
                    Подписок:
                    <div>{subscribed?.length}</div>
                </div>
                <div className={s["user-large-badge__row"]}>
                    <button {...btnProps} className="btn btn-primary me-2" />
                </div>
            </div>
        </div>
    )
}
