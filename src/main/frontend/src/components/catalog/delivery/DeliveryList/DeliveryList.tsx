import React, {FC, useEffect} from "react";
import List from "../../../List/List";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {IDelivery} from "../../../../models/catalog/IDelivery";
import {DeliveryItem} from "../DeliveryItem/DeliveryItem";
import {getAllDelivery} from "../../../../redux/catalog/delivery/operations";

interface DeliveryListProps {

}

export const DeliveryList: FC<DeliveryListProps> = () => {
    const items = useAppSelector(state => state.deliveryReducer.items);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllDelivery({}));
    }, []);

    return (
        <div>
            <List items={items} renderItems={(item: IDelivery) => <DeliveryItem delivery={item}/>}></List>
        </div>
    );
};
