import { Navigate } from 'react-router-dom';

export const ProtectedRouteElement = ({ element }) => {
    const refreshToken = localStorage.getItem('refreshToken')

    return refreshToken ? element : <Navigate to="/login" replace/>;
}
