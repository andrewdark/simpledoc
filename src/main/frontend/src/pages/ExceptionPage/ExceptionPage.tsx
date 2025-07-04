import React from "react";
import css from './ExceptionPage.module.css';
import {NavLink} from "react-router-dom";

interface ExceptionProps {
    message: string;
};

const ExceptionPage = (props: ExceptionProps) => {
    return (
        <div className={css.exceptionPage}>
            <h1>{props.message}</h1>
            <NavLink to={'/'}>Повернутися на головну сторінку</NavLink>
        </div>
    );
};

export default ExceptionPage;
