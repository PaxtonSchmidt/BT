import React from 'react';
import { Navigate, Route, RouteProps } from 'react-router-dom';

interface Props extends RouteProps {
    isAuth: boolean;
}
export default function ProtectedRoute({isAuth, ...routeProps}: Props) {
    console.log('', isAuth)
    if(isAuth) {
        return <Route {...routeProps} />
    }
    return <Navigate to='/login' />
}