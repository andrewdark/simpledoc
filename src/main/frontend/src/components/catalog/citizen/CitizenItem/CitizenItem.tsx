import React, {FC} from 'react';
import {ICitizen} from "../../../../models/catalog/ICitizen";
import css from "./CitizenItem.module.css";
import {BsFeather, BsFileText, BsTrash} from "react-icons/bs";

interface CitizenItemProps {
    citizen: ICitizen;
    readItemHandler: (id: number) => void;
    updateItemHandler: (id: number) => void;
    deleteItemHandler: (id: number) => void;

}

export const CitizenItem: FC<CitizenItemProps> = ({citizen, readItemHandler, updateItemHandler, deleteItemHandler}) => {
    return (
        <div key={citizen.id} className={css.citizenItem}>
            <div>{citizen.id}</div>
            <div className={css.itemNavigation}>
                <div onClick={() => {
                    readItemHandler(citizen.id ? citizen.id : 0)
                }}><BsFileText/></div>
                <div onClick={() => {
                    updateItemHandler(citizen.id ? citizen.id : 0)
                }}><BsFeather/></div>
                <div onClick={() => deleteItemHandler(citizen.id ? citizen.id : 0)}><BsTrash/></div>
            </div>

        </div>
    );
};
