import React, {FC} from 'react';
import css from './AuthMenu.module.css';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {logOut} from "../../redux/auth/operations";

interface AuthMenuProps {
}

export const AuthMenu: FC<AuthMenuProps> = (props) => {
    const dispatch = useAppDispatch();
    const userName:undefined|string = useAppSelector(state=> state.authReducer.user?.firstName)
    return (
        <div className={css.AuthMenu}>
            <p className={css.username}>Welcome, {userName?userName:'NoName'}</p>
            <button type="button" onClick={() => dispatch(logOut())}>
                Logout
            </button>
        </div>
    );
};
