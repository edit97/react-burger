import {Navigate, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";

export const ProtectedRouteElement = ({ element, anonymous = false }) => {
    const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);
    const failedAuth = useSelector((store) => store.auth.failedAuth);

    const location = useLocation();
    const from = location.state?.from || '/';

    if (anonymous && isLoggedIn) {
        return <Navigate to={ from } />;
    }

    if (!anonymous && !isLoggedIn) {
        // return <Navigate to="/login" state={{ from: location}}/>;
    }
    if (failedAuth) {
        return <Navigate to="/login" state={{ from: location}}/>;
    }

    return element;
}
