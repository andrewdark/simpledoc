import React from 'react';
import css from './ResolutionCategoryId.module.css';
import {NavBar, navLinks} from "../../../../components/NavBar/NavBar";

interface ResolutionCategoryParams {
    id: string;
    [key: string]: string | undefined; // Индексная сигнатура: любой другой строковый ключ имеет тип string | undefined
}

const ResolutionCategoryId = () => {
    return (
        <div className={css.resolutionCategoryId}>

        </div>
    );
};

export default ResolutionCategoryId;
