import React from 'react';
import css from './RubricId.module.css';
import {NavBar, navLinks} from "../../../../components/NavBar/NavBar";
import {useParams} from "react-router-dom";

interface RubricParams {
    id: string;
    [key: string]: string | undefined; // Индексная сигнатура
}

const RubricId = () => {
    const { id } = useParams<RubricParams>();

    return (
        <div className={css.rubricId}>
            <NavBar isAddButton={false} isBackButton={true}/>
            <h1>Rubric page ID: {id}</h1>
        </div>
    );
};

export default RubricId;
