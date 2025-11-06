import React, {FC, useRef, useEffect, useState} from 'react';
import css from './AuthMenu.module.css';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {logOut} from "../../redux/auth/operations";
import {BsPersonCircle} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {RxExit} from "react-icons/rx";

interface AuthMenuProps {
}

export const AuthMenu: FC<AuthMenuProps> = (props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userName: undefined | string = useAppSelector(state => state.authReducer.user?.firstName)
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    // Закриття меню при кліку поза ним
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const goToProfile = () => {
        setMenuOpen(false);

        navigate("/");
    };
    const goToCabinet = () => {
        setMenuOpen(false);

        navigate("/");
    };
    const onLogout = () => {
        setMenuOpen(false);
        dispatch(logOut());
        navigate("/sign-in");
    };

    return (
        <div className={css.AuthMenu} ref={dropdownRef}>

            <button className={css.userButton} onClick={toggleMenu}>
                <span className={css.userName}>{userName}</span> <BsPersonCircle size='24'/>
                <span className={css.arrow}>{menuOpen ? "▲" : "▼"}</span>
            </button>

            <div className={`${css.dropdown} ${menuOpen ? css.dropdownOpen : ""}`}
            >
                <div>
                    <button className={css.dropdownItem} onClick={goToProfile}>
                        Мій профіль
                    </button>
                    <button className={css.dropdownItem} onClick={goToCabinet}>
                        Мій кабінет
                    </button>
                </div>

                <hr/>
                <button className={css.dropdownItem} onClick={onLogout}>
                    <div className={css.menuName}>
                        <RxExit/><span>Вихід</span>
                    </div>
                </button>
            </div>
        </div>
    );
};
