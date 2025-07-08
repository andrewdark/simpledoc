import {BsFeather, BsFileText, BsTrash} from "react-icons/bs";
import React, {FC} from "react";
import {ICitizenStatus} from "../../../../models/catalog/ICitizenStatus";
import css from './CitizenStatusItem.module.css';

interface CitizenStatusItemProps {
    item: ICitizenStatus,
    readItemHandler: (id: number) => void;
    updateItemHandler: (id: number) => void;
    deleteItemHandler: (id: number) => void;
}

export const CitizenStatusItem: FC<CitizenStatusItemProps> = ({item, readItemHandler, updateItemHandler, deleteItemHandler}) => {

    return (
        <div key={item.id} className={css.citizenStatusItem}>
            <div>{item.id}</div>
            <div>{item.name}</div>
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
