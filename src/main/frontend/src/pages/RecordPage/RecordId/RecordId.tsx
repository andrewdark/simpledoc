import React from 'react';
import css from './RecordId.module.css';
import {useParams} from "react-router-dom";
import {NavBar} from "../../../components/NavBar/NavBar";

interface RecordParams {
    id: string;
    [key: string]: string | undefined; // Индексная сигнатура: любой другой строковый ключ имеет тип string | undefined
}

const RecordId = () => {
    const { id } = useParams<RecordParams>();

    return (
        <div className={css.recordId}>
            <NavBar isAddButton={false} isBackButton={false}/>
            <h1>Record page ID: {id}</h1>
        </div>
    );
};

export default RecordId;
