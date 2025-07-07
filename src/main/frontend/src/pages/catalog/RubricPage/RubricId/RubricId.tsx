import React from 'react';
import css from './RubricId.module.css';
import {NavBar, navLinks} from "../../../../components/NavBar/NavBar";

interface RubricParams {
    id: string;
    [key: string]: string | undefined; // Индексная сигнатура: любой другой строковый ключ имеет тип string | undefined
}

const RubricId = () => {
    return (
        <div className={css.rubricId}>

        </div>
    );
};

export default RubricId;
