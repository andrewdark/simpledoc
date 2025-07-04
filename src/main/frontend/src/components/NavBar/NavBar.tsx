import React, {FC} from "react";
import css from "./NavBar.module.css";
import {NavLink} from "react-router-dom";
import {BiPlus} from "react-icons/bi";

export type navLinks = { link: string; title: string };

interface NavBarProps {
    navLinks: navLinks[];
    isAddButton: boolean;
    setVisible : (show:boolean)=>void;
}

export const NavBar: FC<NavBarProps> = (props) => {
    return (
        <div className={css.NavBar}>
            {props.navLinks.map((el, index) => (
                <>
                    <div key={index} className={css.NavBarItem}>
                        <NavLink to={el.link}>
                            <strong>{el.title}</strong>
                        </NavLink>
                    </div>
                    <div className={css.NavBarItem}>
                        <strong>/</strong>
                    </div>
                </>

            ))}
            {props.isAddButton ? (
                <div className={css.NavBarItem}>
                    <button className={css.linkTo} onClick={()=>{props.setVisible(true)}}>
                        <BiPlus/>
                    </button>
                </div>
            ) : null}
        </div>
    );
};
