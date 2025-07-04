import React, {FC} from "react";
import {IDelivery} from "../../../../models/catalog/IDelivery";
import css from "./DeliveryItem.module.css";
import {BsFeather, BsFileText, BsTrash} from "react-icons/bs";
import {useAppDispatch} from "../../../../hooks/redux";
import {deleteDelivery} from "../../../../redux/catalog/delivery/operations";
import {useNavigate} from "react-router-dom";


interface DeliveryItemProps {
    delivery: IDelivery
}

export const DeliveryItem: FC<DeliveryItemProps> = ({delivery}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    return (
        <div key={delivery.id} className={css.DeliveryItem}>
            <div>{delivery.id}</div>
            <div>{delivery.name}</div>
            <div>{delivery.createdAt?.getDate()}</div>
            <div><BsFeather/></div>
            <div onClick={()=>navigate(`/catalog/delivery/${delivery.id}`)}><BsFileText/></div>
            <div onClick={() => {
                dispatch(deleteDelivery({id: delivery.id}))
            }}><BsTrash/></div>
        </div>
    );
};
