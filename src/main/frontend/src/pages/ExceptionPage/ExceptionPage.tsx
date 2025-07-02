import React from "react";
import {BsQuestionCircle} from "react-icons/bs";
import {NavLink} from "react-router-dom";

interface ExceptionProps {
    message: string;
};

export const ExceptionPage = (props:ExceptionProps) => {
    return (
        <div>
            <div className={"container"}>
                <h1>{props.message}</h1>
                <NavLink to={'/'}>Повернутися на головну сторінку</NavLink>
            </div>

        </div>
    );
};
