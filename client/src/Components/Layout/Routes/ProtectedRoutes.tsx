import React from 'react';
import { Navigate, Route, RouteProps } from 'react-router-dom';

interface Props extends RouteProps {
    isAuth: boolean;
}

export default function ProtectedRoute({isAuth, ...routeProps}: Props) {
    if(isAuth === true) {
        return <Route {...routeProps} />
    }
    return <Navigate to='/login' />
}