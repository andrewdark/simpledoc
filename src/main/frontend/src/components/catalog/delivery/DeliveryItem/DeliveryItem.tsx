import React, {FC} from "react";
import {IDelivery} from "../../../../models/catalog/IDelivery";
import css from "./DeliveryItem.module.css";
import {BsFeather, BsFileText, BsTrash} from "react-icons/bs";
import {deleteDelivery} from "../../../../redux/catalog/delivery/operations";
import {useAppDispatch} from "../../../../hooks/redux";
import {useNavigate} from "react-router-dom";


interface DeliveryItemProps {
    delivery: IDelivery
}

export const DeliveryItem: FC<DeliveryItemProps> = ({delivery}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    return (
        <div key={delivery.id} className={css.deliveryItem}>
            <div>{delivery.id}</div>
            <div>{delivery.name}</div>
            <div>{delivery.createdAt}</div>
            <div><BsFeather/></div>
            <div onClick={()=>navigate(`/catalog/delivery/${delivery.id}`, {state:{param1:"hello", param2:"worm"}})}><BsFileText/></div>
            <div onClick={() => {
                dispatch(deleteDelivery({id: delivery.id}))
            }}><BsTrash/></div>
        </div>
    );
};
