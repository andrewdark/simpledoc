import React, {FC} from "react";
import css from "./NavBar.module.css";
import {NavLink} from "react-router-dom";
import {BiPlus} from "react-icons/bi";

export type navLinks = { link: string, title: string };

interface NavBarProps {
    navLinks: navLinks[],
    isAddButton: boolean,
}

export const NavBar: FC<NavBarProps> = (props) => {
    return (
        <div className={css.NavBar}>
            {props.navLinks.map((el, index) =>
                <div key={index} className={css.NavBarItem}>
                    <div className={css.linkTo}>
                        <NavLink to={el.link}><strong>{el.title}</strong></NavLink>
                    </div>
                    <div className={css.linkTo}>
                        <strong>/</strong>
                    </div>
                </div>
            )}
            {props.isAddButton ? <div className={css.linkTo}>
                <button><BiPlus/></button>
            </div> : null}
        </div>
    );
}
