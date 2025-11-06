import React from 'react';
import css from './Logo.module.css'
import {BsSun} from "react-icons/bs";
import {NavLink} from "react-router-dom";

export const Logo: React.FC = () => {
    return (
        <NavLink to={'/'}>
            <div className={css.Logo}>
                <BsSun className="logo-icon" size='32'/> <span>SimpleDoc</span>
            </div>
        </NavLink>
    );
};
