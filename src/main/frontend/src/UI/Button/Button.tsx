import React, {FC} from "react";
import css from './Button.module.css';

interface ButtonProps {
    children: React.ReactNode;
    color?: string;
    fontSize?: string;
    onClickHandler: () => void;
}

export const Button: FC<ButtonProps> = (props) => {
    return (
        <div className={css.button}  onClick={() => props.onClickHandler}>
            {props.children}
        </div>
    );
};
