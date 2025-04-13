import {Navigate, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";
import {ReactNode} from "react";
import {TReduxStore} from "../../utils/types";

type ProtectedRouteElementProps = {
    element: ReactNode;
    anonymous?: boolean;
}

export const ProtectedRouteElement = ({ element, anonymous = false }: ProtectedRouteElementProps) => {
    const isLoggedIn = useSelector((store: TReduxStore) => store.auth.isLoggedIn);
    const failedAuth = useSelector((store: TReduxStore) => store.auth.failedAuth);

    const location = useLocation();
    const from = location.state?.from || '/';

    if (anonymous && isLoggedIn) {
        return <Navigate to={ from } />;
    }

    if (!anonymous && !isLoggedIn) {
        return <Navigate to="/login" state={{ from: location}}/>;
    }
    if (failedAuth) {
        return <Navigate to="/login" state={{ from: location}}/>;
    }

    return element;
}
