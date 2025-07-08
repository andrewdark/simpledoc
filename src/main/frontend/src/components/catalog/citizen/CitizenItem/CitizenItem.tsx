import React, {FC} from 'react';
import {ICitizen} from "../../../../models/catalog/ICitizen";
import css from "./CitizenItem.module.css";
import {BsFeather, BsFileText, BsTrash} from "react-icons/bs";

interface CitizenItemProps {
    item: ICitizen;
    readItemHandler: (id: number) => void;
    updateItemHandler: (id: number) => void;
    deleteItemHandler: (id: number) => void;

}

export const CitizenItem: FC<CitizenItemProps> = ({item, readItemHandler, updateItemHandler, deleteItemHandler}) => {
    return (
        <div key={item.id} className={css.citizenItem}>
            <div>{item.id}</div>
            <div>{item.fullName}</div>
            <div>{item.address}</div>
            <div className={css.itemNavigation}>
                <div onClick={() => {
                    readItemHandler(item.id ? item.id : 0)
                }}><BsFileText/></div>
                <div onClick={() => {
                    updateItemHandler(item.id ? item.id : 0)
                }}><BsFeather/></div>
                <div onClick={() => deleteItemHandler(item.id ? item.id : 0)}><BsTrash/></div>
            </div>

        </div>
    );
};
