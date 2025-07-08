import {BsFeather, BsFileText, BsTrash} from "react-icons/bs";
import React, {FC} from "react";
import {IResolutionCategory} from "../../../../models/catalog/IResolutionCategory";
import css from './ResolutionCategoryItem.module.css';

interface ResolutionCategoryItemProps {
    item: IResolutionCategory,
    readItemHandler: (id: number) => void;
    updateItemHandler: (id: number) => void;
    deleteItemHandler: (id: number) => void;
}

export const ResolutionCategoryItem: FC<ResolutionCategoryItemProps> = ({item, readItemHandler, updateItemHandler, deleteItemHandler}) => {

    return (
        <div key={item.id} className={css.resolutionCategoryItem}>
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
