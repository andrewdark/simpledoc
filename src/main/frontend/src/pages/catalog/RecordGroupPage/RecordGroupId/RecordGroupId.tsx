import React from 'react';
import {NavBar, navLinks} from "../../../../components/NavBar/NavBar";
import css from './RecordGroupId.module.css';

interface RecordGroupParams {
    id: string;
    [key: string]: string | undefined; // Индексная сигнатура: любой другой строковый ключ имеет тип string | undefined
}

const RecordGroupId = () => {
    return (
        <div className={css.recordGroupId}>
            
        </div>
    );
};

export default RecordGroupId;
