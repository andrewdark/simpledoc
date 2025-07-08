import React, {FC} from "react";
import css from "./NavBar.module.css";
import {NavLink} from "react-router-dom";
import {BiPlus} from "react-icons/bi";
import {useAppDispatch} from "../../hooks/redux";
import {setModal} from "../../redux/modal/slice";
import {Button} from "../../UI/Button/Button";

export type navLinks = { link: string; title: string };

interface NavBarProps {
    navLinks?: navLinks[] | null;
    isAddButton: boolean;
}

export const NavBar: FC<NavBarProps> = (props) => {
    const dispatch = useAppDispatch();
    const links: navLinks[] = props.navLinks??[{ link: "/", title: "Головна" }];

    const onClickHandler = () => {
        dispatch(setModal(true));
    };

    return (
        <div className={css.navBar}>
            {links.map((el, index) => (
                <>
                    <div key={index} className={css.navBarItem}>
                        <NavLink to={el.link}>
                            <strong>{el.title}</strong>
                        </NavLink>
                    </div>
                    <div className={css.navBarItem}>
                        <strong>/</strong>
                    </div>
                </>

            ))}
            {props.isAddButton ? (
                <div className={css.navBarItem}>
                    <Button onClickHandler={onClickHandler} >
                        <BiPlus/>
                    </Button>
                </div>
            ) : null}
        </div>
    );
};
