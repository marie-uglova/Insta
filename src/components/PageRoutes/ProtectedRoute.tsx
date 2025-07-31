import {FC, ReactNode} from "react";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "@redux/store";

export const ProtectedRoute: FC<{ children: ReactNode }> = ({children}) => {
    const authorisedUser = useSelector((state: RootState) => state.users.authorizedUser);

    if (!authorisedUser) {
        return <Navigate to="/no-access" replace />;
    }

    return children;
};
