import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import React from "react";

/**
 * - If the route is private and the user is logged in, render the component
 * - Otherwise render <Navigate> to redirectTo
 */
interface PrivateRouteProps{
    component: React.JSX.Element;
    redirectTo: string;
};

export const PrivateRoute = (props:PrivateRouteProps) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return isLoggedIn ? props.component : <Navigate to={props.redirectTo} />;
};

