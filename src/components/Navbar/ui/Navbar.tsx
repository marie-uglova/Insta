import {FC} from "react";
import {UserBadge, UserBadgeProps} from "@components/UserBadge";
import s from "./Navbar.module.scss";

export const Navbar: FC<UserBadgeProps> = ({nickname, avatarUrl, id}) => {
    return (
        <div className={s["navbar"]}>
            <div className="container">
                <div className={s["navbar__inner"]}>
                    <div className={s["navbar__logo"]}>Привет!</div>
                    <UserBadge nickname={nickname} avatarUrl={avatarUrl} id={id} />
                </div>
            </div>
        </div>
    )
}
