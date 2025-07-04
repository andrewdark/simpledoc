import React from "react";
import css from './DeliveryId.module.css';
import {useLocation, useParams} from "react-router-dom";

interface DeliveryParams {
    id: string;
    [key: string]: string | undefined; // Индексная сигнатура: любой другой строковый ключ имеет тип string | undefined
}

export const DeliveryId: React.FC = () => {
    // Получаем параметры из URL
    const { id } = useParams<DeliveryParams>();

    // Получаем объект location, который содержит переданное состояние
    const location = useLocation();

    // Доступ к состоянию, переданному через navigate({ state: ... })
    const state = location.state as { param1?: string; param2?: string } | undefined;

    return (
        <div className={css.deliveryId}>
            <h1>Delivery page ID: {id}</h1>
            <p>{state?state.param1:""}</p>
            <p>{state?state.param2:""}</p>
        </div>
    );
};
