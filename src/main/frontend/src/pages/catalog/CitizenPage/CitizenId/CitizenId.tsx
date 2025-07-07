import React from 'react';
import css from './CitizenId.module.css';
import {NavBar, navLinks} from "../../../../components/NavBar/NavBar";
import CitizenCategoryId from "../../CitizenCategoryPage/CitizenCategoryId/CitizenCategoryId";

interface CitizenParams {
    id: string;
    [key: string]: string | undefined; // Индексная сигнатура: любой другой строковый ключ имеет тип string | undefined
}

const CitizenId = () => {
    return (
        <div className={css.citizenId}>

        </div>
    );
};

export default CitizenId;
