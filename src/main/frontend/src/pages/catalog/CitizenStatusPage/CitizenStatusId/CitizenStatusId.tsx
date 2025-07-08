import React from 'react';
import css from './CitizenStatusId.module.css';
import {NavBar, navLinks} from "../../../../components/NavBar/NavBar";
import {useLocation, useParams} from "react-router-dom";

interface CitizenStatusParams {
    id: string;
    [key: string]: string | undefined; // Индексная сигнатура: любой другой строковый ключ имеет тип string | undefined
}

const CitizenStatusId = () => {
    const { id } = useParams<CitizenStatusParams>();
    const location = useLocation();
    const state = location.state as {navLinks: navLinks[]} | undefined;
    return (
        <div className={css.citizenStatusId}>
            <NavBar navLinks={ state?state.navLinks: null} isAddButton={false}/>
            <h1>CitizenStatus ID: {id}</h1>
        </div>
    );
};

export default CitizenStatusId;
