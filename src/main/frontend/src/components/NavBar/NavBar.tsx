import React, {FC} from "react";
import css from "./NavBar.module.css";
import {NavLink} from "react-router-dom";
import {BiPlus} from "react-icons/bi";
import {useAppDispatch} from "../../hooks/redux";
import {setModal} from "../../redux/modal/slice";

export type navLinks = { link: string; title: string };

interface NavBarProps {
    navLinks: navLinks[] | null;
    isAddButton: boolean;
}

export const NavBar: FC<NavBarProps> = (props) => {
    const dispatch = useAppDispatch();
    const links: navLinks[] = props.navLinks??[{ link: "/", title: "Головна" }];
    return (
        <div className={css.NavBar}>
            {links.map((el, index) => (
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
                    <button className={css.linkTo} onClick={() => {
                        dispatch(setModal(true));
                    }}>
                        <BiPlus/>
                    </button>
                </div>
            ) : null}
        </div>
    );
};
