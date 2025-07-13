import React from 'react';
import {NavBar, navLinks} from "../../../../components/NavBar/NavBar";
import css from './RecordGroupId.module.css';
import {useParams} from "react-router-dom";

interface RecordGroupParams {
    id: string;
    [key: string]: string | undefined; // Индексная сигнатура: любой другой строковый ключ имеет тип string | undefined
}

const RecordGroupId = () => {
    const { id } = useParams<RecordGroupParams>();

    return (
        <div className={css.recordGroupId}>
            <NavBar isAddButton={false} isBackButton={true}/>
            <h1>RecordGroup page ID: {id}</h1>
        </div>
    );
};

export default RecordGroupId;
