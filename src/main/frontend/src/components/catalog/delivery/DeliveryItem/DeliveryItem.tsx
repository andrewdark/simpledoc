import React, {FC} from "react";
import {IDelivery} from "../../../../models/catalog/IDelivery";
import css from "./DeliveryItem.module.css";

interface DeliveryItemProps {
    delivery: IDelivery
}

export const DeliveryItem: FC<DeliveryItemProps> = ({delivery}) => {
    return (
        <div key={delivery.id} className={css.DeliveryItem}>
            <div>{delivery.id}</div> <div>{delivery.name}</div><div>{delivery.createdAt?.getDate()}</div>
        </div>
    );
};
