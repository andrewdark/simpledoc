import React from 'react';
import css from './Logo.module.css'
import {BsSun} from "react-icons/bs";

export const Logo:React.FC = () => {
    return (
            <div className={css.Logo}>
                <BsSun className="logo-icon" size='32'/> <span>SimpleDoc</span>
            </div>
    );
};
