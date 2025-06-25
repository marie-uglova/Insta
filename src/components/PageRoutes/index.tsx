import React, {FC, useEffect} from "react";
import {AnyAction} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MainPage} from "@pages/MainPage";
import {UserPage} from "@pages/UserPage";
import {NoAccessPage} from "@pages/NoAccessPage";
import {getAuthorisedUser} from "@redux/actions/users";
import {RootState} from "@redux/store";

const authorisedRoutes = [
    <Route key="/" path="/" element={<MainPage />} />,
    <Route key="/:id" path="/:id" element={<UserPage />} />
]

const noAuthorisedRoutes = [
    <Route key="/" path="/" element={<NoAccessPage />} />
]

export const PageRoutes: FC = () => {
    const dispatch = useDispatch();
    const authorizedUser = useSelector((state: RootState) => state.users.authorizedUser);
    const isLoading = useSelector((state: RootState) => state.users.isUserLoading);

    useEffect(() => {
        (dispatch as ThunkDispatch<RootState, unknown, AnyAction>)(getAuthorisedUser());
    }, [dispatch]);

    if(isLoading) {
        return (
            "загрузка"
        )
    }

    return (
        <BrowserRouter>
            <Routes>
                {authorizedUser ? authorisedRoutes : noAuthorisedRoutes}
            </Routes>
        </BrowserRouter>
    )
}
