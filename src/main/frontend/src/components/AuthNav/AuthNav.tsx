import React from 'react';
import {HiUser} from "react-icons/hi";
import {NavLink} from "react-router-dom";
import css from "./AuthNav.module.css";

export const AuthNav = () => {
    return (
        <div className={css.authNav}>
            <HiUser className="my-icon" size="24" />
            <NavLink className={css.link} to={`/sign-in`}>
                Login
            </NavLink>
            <NavLink className={css.link} to={`/sign-up`}>
                Register
            </NavLink>
        </div>
    );
};
