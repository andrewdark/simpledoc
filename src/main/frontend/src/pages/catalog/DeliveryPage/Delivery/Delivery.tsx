import css from './Delivery.module.css';
import {NavBar, navLinks} from "../../../../components/NavBar/NavBar";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {useEffect} from "react";
import {createDelivery, deleteDelivery, getAllDelivery} from "../../../../redux/catalog/delivery/operations";
import {IDelivery} from "../../../../models/catalog/IDelivery";
import {DeliveryItem} from "../../../../components/catalog/delivery/DeliveryItem/DeliveryItem";
import List from "../../../../components/List/List";
import {PageBar} from "../../../../components/PageBar/PageBar";
import ModalFormContainer from "../../../../hoc/ModalFormContainer/ModalFormContainer";
import {DeliveryForm} from "../../../../components/catalog/delivery/DeliveryForm/DeliveryForm";
import {setModal} from "../../../../redux/modal/slice";
import {getAllCitizen} from "../../../../redux/catalog/citizen/operations";
import {useNavigate} from "react-router-dom";

const Delivery = () => {
    const items = useAppSelector(state => state.deliveryReducer.items);
    const page = useAppSelector(state => state.deliveryReducer.page);
    const navLinks: navLinks[] = [{link: "/", title: "Головна"}, {
        link: "/catalog",
        title: "Довідники"
    }, {link: "/catalog/delivery", title: "Види доставки"}];
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllDelivery({size: 10, number: 0}));
    }, [dispatch]);

    //---=== CRUD OPERATION HANDLERS ===---//
    const createItemHandler = (dto: IDelivery) => {
        dispatch(createDelivery({dto: dto}));
        dispatch(setModal(false));
    };
    const readItemHandler = (id: number) => {
        navigate(`/catalog/delivery/${id}`, {state:{param1:"hello", param2:"worm"}})
    };
    const updateItemHandler = (id: number) => {
        dispatch(setModal(false));
    };
    const deleteItemHandler = (id: number) => {
        dispatch(deleteDelivery({id: id}));
    };

    const pageSelectionHandler = (currentPage: number) => {
        if (currentPage >= 0 && currentPage < page.totalPages) {
            dispatch(getAllCitizen({size: 10, number: currentPage}));
        }
    };

    return (
        <div className={css.delivery}>
            <ModalFormContainer>
                <DeliveryForm deliveryFormHandler={createItemHandler}/>
            </ModalFormContainer>
            <NavBar navLinks={navLinks} isAddButton={true}/>
            <List items={items}
                  renderItems={(item: IDelivery) => <DeliveryItem item={item} readItemHandler={readItemHandler}
                                                                  updateItemHandler={updateItemHandler}
                                                                  deleteItemHandler={deleteItemHandler}/>}></List>
            <PageBar page={page} clickPage={pageSelectionHandler}/>
        </div>

    );
}

export default Delivery;
