import css from './Delivery.module.css';
import {NavBar} from "../../../../components/NavBar/NavBar";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import React, {useEffect} from "react";
import {
    createDelivery,
    deleteDelivery,
    getAllDelivery,
    getDeliveryById,
    updateDelivery
} from "../../../../redux/catalog/delivery/operations";
import {IDelivery} from "../../../../models/catalog/IDelivery";
import {DeliveryItem} from "../../../../components/catalog/delivery/DeliveryItem/DeliveryItem";
import List from "../../../../components/List/List";
import {PageBar} from "../../../../components/PageBar/PageBar";
import ModalFormContainer from "../../../../hoc/ModalFormContainer/ModalFormContainer";
import {DeliveryForm} from "../../../../components/catalog/delivery/DeliveryForm/DeliveryForm";
import {setModal} from "../../../../redux/modal/slice";
import {useNavigate} from "react-router-dom";
import {addNavegante} from "../../../../redux/navegante/slice";

const Delivery = () => {
    const items = useAppSelector(state => state.deliveryReducer.items);
    const page = useAppSelector(state => state.deliveryReducer.page);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(addNavegante({
            link: `./delivery`,
            title: "Види доставки"
        }));
        dispatch(getAllDelivery({size: 10, number: 0}));
    }, [dispatch]);

    //---=== CRUD OPERATION HANDLERS ===---//
    const saveItemHandler = (dto: IDelivery) => {
        if (dto && dto.id) {
            dispatch(updateDelivery({id: dto.id, dto: dto}));
        } else {
            dispatch(createDelivery({dto: dto}));
        }

        dispatch(setModal(false));
    };
    const readItemHandler = (id: number) => {
        navigate(`/catalog/delivery/${id}`, {state: {param1: "hello", param2: "worm"}})
    };
    const updateItemHandler = async (id: number) => {
        if (id) {
            await dispatch(getDeliveryById({id: id}))
            dispatch(setModal(true));
        }

    };
    const deleteItemHandler = (id: number) => {
        dispatch(deleteDelivery({id: id}));
    };

    const pageSelectionHandler = (currentPage: number) => {
        if (currentPage >= 0 && currentPage < page.totalPages) {
            dispatch(getAllDelivery({size: 10, number: currentPage}));
        }
    };

    return (
        <div className={css.delivery}>
            <ModalFormContainer>
                <DeliveryForm formHandler={saveItemHandler}/>
            </ModalFormContainer>
            <NavBar isAddButton={true} isBackButton={true}/>
            <List items={items}
                  renderItems={(item: IDelivery) => <DeliveryItem item={item} readItemHandler={readItemHandler}
                                                                      updateItemHandler={updateItemHandler}
                                                                      deleteItemHandler={deleteItemHandler}/>}></List>
            <PageBar page={page} clickPage={pageSelectionHandler}/>
        </div>

    );
}

export default Delivery;
