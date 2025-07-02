import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import React from "react";

/**
 * - If the route is restricted and the user is logged in,
 *  render a <Navigate> to redirectTo
 * - Otherwise render the component
 */

interface RestrictedRouteProps{
    component: React.JSX.Element;
    redirectTo: string;
};

export const RestrictedRoute = (props:RestrictedRouteProps) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return isLoggedIn ? <Navigate to={props.redirectTo} /> : props.component;
};
