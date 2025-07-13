import React from 'react';
import css from './ResolutionCategoryId.module.css';
import {NavBar, navLinks} from "../../../../components/NavBar/NavBar";
import {useParams} from "react-router-dom";

interface ResolutionCategoryParams {
    id: string;
    [key: string]: string | undefined; // Индексная сигнатура: любой другой строковый ключ имеет тип string | undefined
}

const ResolutionCategoryId = () => {
    const { id } = useParams<ResolutionCategoryParams>();

    return (
        <div className={css.resolutionCategoryId}>
            <NavBar isAddButton={false} isBackButton={true}/>
            <h1>ResolutionCategory page ID: {id}</h1>
        </div>
    );
};

export default ResolutionCategoryId;
