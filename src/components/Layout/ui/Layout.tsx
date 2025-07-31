import {FC, ReactNode} from "react";
import {Navbar} from "@components/Navbar";

type LayoutProps = {
    nickname: string
    avatarUrl?: string
    id: string
    children: ReactNode
}

export const Layout: FC<LayoutProps> = ({nickname, avatarUrl, id, children}) => {
    return (
        <div className="page">
            <Navbar nickname={nickname} avatarUrl={avatarUrl} id={id} />
            {children}
        </div>
    )
}
