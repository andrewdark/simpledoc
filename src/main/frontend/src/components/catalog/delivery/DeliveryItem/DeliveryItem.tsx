import React, {FC} from "react";
import {IDelivery} from "../../../../models/catalog/IDelivery";
import css from "./DeliveryItem.module.css";
import {BsFeather, BsFileText, BsTrash} from "react-icons/bs";

interface DeliveryItemProps {
    item: IDelivery,
    readItemHandler: (id: number) => void;
    updateItemHandler: (id: number) => void;
    deleteItemHandler: (id: number) => void;
}

export const DeliveryItem: FC<DeliveryItemProps> = ({item, readItemHandler, updateItemHandler, deleteItemHandler}) => {

    return (
        <div key={item.id} className={css.deliveryItem}>
            <div>{item.id}</div>
            <div>{item.name}</div>
            <div>{item.createdAt}</div>
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
