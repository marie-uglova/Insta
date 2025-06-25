import {FC} from "react";
import {Layout} from "@components/Layout";

export const UserPage: FC = () => {
    return (
        <Layout nickName="Имя" id={1}>
            <div>страница пользователя</div>
        </Layout>
    )
}
