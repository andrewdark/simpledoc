import React from 'react';
import css from './OrganizationId.module.css';
import {NavBar, navLinks} from "../../../../components/NavBar/NavBar";

interface OrganizationParams {
    id: string;
    [key: string]: string | undefined; // Индексная сигнатура: любой другой строковый ключ имеет тип string | undefined
}

const OrganizationId = () => {
    return (
        <div className={css.organizationId}>

        </div>
    );
};

export default OrganizationId;
