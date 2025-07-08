import React, {FC} from 'react';
import {IDepartment} from "../../../../models/catalog/IDepartment";
import css from './DepartmentItem.module.css';

import {BsBuilding, BsFeather, BsFileText, BsPersonVcard, BsTrash} from "react-icons/bs";


interface DepartmentItemProps {
    item: IDepartment,
    readItemHandler: (id: number) => void;
    updateItemHandler: (id: number) => void;
    deleteItemHandler: (id: number) => void;
}

export const DepartmentItem: FC<DepartmentItemProps> = ({
                                                            item,
                                                            readItemHandler,
                                                            updateItemHandler,
                                                            deleteItemHandler
                                                        }) => {

    return (
        <div key={item.id} className={css.departmentItem}>
            <div className={css.simpleColumn}>{item.id}</div>
            <div className={css.simpleColumn}>{item.official ? <BsPersonVcard size="24"/> : <BsBuilding size="24"/>}</div>
            <div className={css.unitedColumn}>
                <div><b>{item.name}</b></div>
                <div>{item.official ? item.position : null}</div>
            </div>

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
