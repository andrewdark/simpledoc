import React from 'react';
import css from './CitizenId.module.css';
import {useParams} from "react-router-dom";
import {NavBar} from "../../../../components/NavBar/NavBar";

interface CitizenParams {
    id: string;
    [key: string]: string | undefined; // Индексная сигнатура: любой другой строковый ключ имеет тип string | undefined
}

const CitizenId = () => {
    const { id } = useParams<CitizenParams>();

    return (
        <div className={css.citizenId}>
            <NavBar isAddButton={false} isBackButton={true}/>
            <h1>Citizen page ID: {id}</h1>
        </div>
    );
};

export default CitizenId;
