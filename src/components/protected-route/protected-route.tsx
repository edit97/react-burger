import {Navigate, useLocation} from 'react-router-dom';
import {ReactNode} from "react";
import {useAppSelector} from "../../services/store";

type ProtectedRouteElementProps = {
    element: ReactNode;
    anonymous?: boolean;
}

export const ProtectedRouteElement = ({ element, anonymous = false }: ProtectedRouteElementProps) => {
    const isLoggedIn = useAppSelector((store) => store.auth.isLoggedIn);
    const failedAuth = useAppSelector((store) => store.auth.failedAuth);

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
