import React from 'react';
import css from './CitizenStatusId.module.css';
import {NavBar} from "../../../../components/NavBar/NavBar";
import {useParams} from "react-router-dom";

interface CitizenStatusParams {
    id: string;
    [key: string]: string | undefined; // Индексная сигнатура: любой другой строковый ключ имеет тип string | undefined
}

const CitizenStatusId = () => {
    const { id } = useParams<CitizenStatusParams>();

    return (
        <div className={css.citizenStatusId}>
            <NavBar isAddButton={false} isBackButton={true}/>
            <h1>CitizenStatus ID: {id}</h1>
        </div>
    );
};

export default CitizenStatusId;
