import React, {FC} from 'react';
import css from './RubricItem.module.css';
import {BsFeather, BsFileText, BsTrash} from "react-icons/bs";
import {IRubric} from "../../../../models/catalog/IRubric";

interface RubricItemProps {
    item: IRubric,
    readItemHandler: (id: number) => void;
    updateItemHandler: (id: number) => void;
    deleteItemHandler: (id: number) => void;
}

export const RubricItem: FC<RubricItemProps> = ({item, readItemHandler, updateItemHandler, deleteItemHandler}) => {

    return (
        <div key={item.id} className={css.RubricItem}>
            <div>{item.id}</div>
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
