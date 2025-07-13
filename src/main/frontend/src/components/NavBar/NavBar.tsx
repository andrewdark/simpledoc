import React, {FC} from "react";
import css from "./NavBar.module.css";
import {NavLink} from "react-router-dom";
import {BiPlus} from "react-icons/bi";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {setModal} from "../../redux/modal/slice";
import {Button} from "../../UI/Button/Button";
import {BsArrowCounterclockwise} from "react-icons/bs";
import {INavegante} from "../../models/INavegante";
import {clearNavegante} from "../../redux/navegante/slice";

export type navLinks = { link: string; title: string };

interface NavBarProps {
    isAddButton: boolean;
    isBackButton: boolean;
}

export const NavBar: FC<NavBarProps> = (props) => {
    const dispatch = useAppDispatch();
    const links: INavegante[] = useAppSelector(state => state.naveganteReducer.navList);

    const onClickHandler = () => {
        dispatch(clearNavegante(""))
        dispatch(setModal(true));
    };

    return (
        <div className={css.navBar}>
            {links.map((el, index) => (
                <div key={index} className={css.navBarItem}>
                    <NavLink to={el.link}>
                        <strong>{el.title}</strong>
                    </NavLink>
                </div>
            ))}

            {props.isAddButton ? (
                <div className={css.navBarItem}>
                    <Button onClickHandler={onClickHandler}>
                        <BiPlus/>
                    </Button>
                </div>
            ) : null
            }
            {props.isBackButton ? (
                <div className={css.navBarItem}>

                    <Button onClickHandler={() => window.history.back()}>
                        <BsArrowCounterclockwise/>
                    </Button>
                </div>
            ) : null
            }

        </div>

    );
};
