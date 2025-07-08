import React from 'react';
import css from './OrganizationId.module.css';
import {NavBar, navLinks} from "../../../../components/NavBar/NavBar";
import {useParams} from "react-router-dom";

interface OrganizationParams {
    id: string;
    [key: string]: string | undefined; // Индексная сигнатура: любой другой строковый ключ имеет тип string | undefined
}

const OrganizationId = () => {
    const { id } = useParams<OrganizationParams>();

    return (
        <div className={css.organizationId}>
            <NavBar isAddButton={false}/>
            <h1>Organization page ID: {id}</h1>
        </div>
    );
};

export default OrganizationId;
