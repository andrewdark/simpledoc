import React from "react";
import css from './DeliveryId.module.css';
import {useLocation, useParams} from "react-router-dom";
import {NavBar} from "../../../../components/NavBar/NavBar";

interface DeliveryParams {
    id: string;
    [key: string]: string | undefined; // Индексная сигнатура: любой другой строковый ключ имеет тип string | undefined
}

const DeliveryId: React.FC = () => {
    // Получаем параметры из URL
    const { id } = useParams<DeliveryParams>();
    // Получаем объект location, который содержит переданное состояние
    const location = useLocation();
    // Доступ к состоянию, переданному через navigate({ state: ... })
    //const state = location.state as {navLinks: navLinks} | undefined;

    return (
        <div className={css.deliveryId}>
            <NavBar isAddButton={false} isBackButton={true}/>
            <h1>Delivery page ID: {id}</h1>
        </div>
    );
};

export default DeliveryId;
