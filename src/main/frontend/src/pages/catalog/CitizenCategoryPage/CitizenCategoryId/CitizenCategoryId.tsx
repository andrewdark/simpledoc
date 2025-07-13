import React from 'react';
import css from './CitizenCategoryId.module.css';
import {NavBar} from "../../../../components/NavBar/NavBar";
import {useParams} from "react-router-dom";

interface CitizenCategoryParams {
    id: string;
    [key: string]: string | undefined; // Индексная сигнатура
}

const CitizenCategoryId = () => {

    const { id } = useParams<CitizenCategoryParams>();

    return (
        <div className={css.citizenCategoryId}>
            <NavBar isAddButton={false} isBackButton={true}/>
            <h1>CitizenCategory page ID: {id}</h1>
        </div>
    );
};

export default CitizenCategoryId;
