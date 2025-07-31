import React, {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
//import {ProtectedRoute} from "@components/PageRoutes/ProtectedRoute";
import {MainPage} from "@pages/MainPage";
import {UserPage} from "@pages/UserPage";
import {NoAccessPage} from "@pages/NoAccessPage";
import {getAuthorisedUser} from "@redux/actions/users";
import {AppThunkDispatch, RootState} from "@redux/store";

/*export const routes = [
    {
        path: "/no-access",
        element: <NoAccessPage />,
        protected: false
    },
    {
        path: "/",
        element: <MainPage />,
        protected: true
    },
    {
        path: "/:id",
        element: <UserPage />,
        protected: true
    }
];

const getRoutes = () => routes.map(route => (
    <Route
        key={route.path}
        path={route.path}
        element={route.protected ? <ProtectedRoute>{route.element}</ProtectedRoute> : route.element}
    />
));*/

const authorisedRoutes = [
    <Route key="/" path="/" element={<MainPage />} />,
    <Route key="/:id" path="/:id" element={<UserPage />} />
]

const noAuthorisedRoutes = [
    <Route key="/" path="/" element={<NoAccessPage />} />
]

export const PageRoutes: FC = () => {
    const dispatch = useDispatch<AppThunkDispatch>();
    const authorizedUser = useSelector((state: RootState) => state.users.authorizedUser);
    const isLoading = useSelector((state: RootState) => state.users.isAuthorizedUserLoading);

    useEffect(() => {
        dispatch(getAuthorisedUser());
    }, [dispatch]);

    if(isLoading) {
        return (
            "загрузка"
        )
    }

    return (
        <BrowserRouter>
            <Routes>
                {/*{getRoutes()}*/}
                {authorizedUser ? authorisedRoutes : noAuthorisedRoutes}
            </Routes>
        </BrowserRouter>
    )
}
