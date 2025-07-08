import React from 'react';
import css from "./DepartmentId.module.css";
import {useParams} from "react-router-dom";
import {NavBar, navLinks} from "../../../../components/NavBar/NavBar";

interface DepartmentParams {
    id: string;
    [key: string]: string | undefined; // Индексная сигнатура: любой другой строковый ключ имеет тип string | undefined
}

const DepartmentId = () => {
    const { id } = useParams<DepartmentParams>();

    return (
        <div className={css.departmentId}>
            <NavBar isAddButton={false}/>
            <h1>Department page ID: {id}</h1>
        </div>
    )
};

export default DepartmentId;
