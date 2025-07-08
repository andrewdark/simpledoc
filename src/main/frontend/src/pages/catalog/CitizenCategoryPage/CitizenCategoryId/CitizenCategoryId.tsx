import React from 'react';
import css from './CitizenCategoryId.module.css';
import {NavBar, navLinks} from "../../../../components/NavBar/NavBar";
import {useLocation, useParams} from "react-router-dom";

interface CitizenCategoryParams {
    id: string;
    [key: string]: string | undefined; // Индексная сигнатура
}

const CitizenCategoryId = () => {

    const { id } = useParams<CitizenCategoryParams>();
    const location = useLocation();
    const state = location.state as {navLinks: navLinks[]} | undefined;
    return (
        <div className={css.citizenCategoryId}>
            <NavBar navLinks={ state?state.navLinks: [{ link: "/", title: "Головна" }]} isAddButton={false}/>
            <h1>CitizenCategory page ID: {id}</h1>
        </div>
    );
};

export default CitizenCategoryId;
