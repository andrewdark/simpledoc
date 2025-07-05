import css from './Delivery.module.css';
import {NavBar, navLinks} from "../../../../components/NavBar/NavBar";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {useEffect} from "react";
import {createDelivery, getAllDelivery} from "../../../../redux/catalog/delivery/operations";
import {IDelivery} from "../../../../models/catalog/IDelivery";
import {DeliveryItem} from "../../../../components/catalog/delivery/DeliveryItem/DeliveryItem";
import List from "../../../../components/List/List";
import {PageBar} from "../../../../components/PageBar/PageBar";
import ModalFormContainer from "../../../../hoc/ModalFormContainer/ModalFormContainer";
import {DeliveryForm} from "../../../../components/catalog/delivery/DeliveryForm/DeliveryForm";
import {setModal} from "../../../../redux/modal/slice";

const Delivery = () => {
    const items = useAppSelector(state => state.deliveryReducer.items);
    const page = useAppSelector(state => state.deliveryReducer.page);
    const navLinks: navLinks[] = [{link: "/", title: "Головна"}, {
        link: "/catalog",
        title: "Довідники"
    }, {link: "/catalog/delivery", title: "Види доставки"}];

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllDelivery({size: 10, number: 0}));
    }, [dispatch]);

    const clickPage = (currentPage: number) => {
        if (currentPage >= 0 && currentPage < page.totalPages) {
            dispatch(getAllDelivery({size: 10, number: currentPage}));
        }
    }

    const deliveryFormHandler = (delivery: IDelivery) => {
        dispatch(createDelivery({dto: delivery}));
        dispatch(setModal(false));
    }

    return (
        <div className={css.delivery}>
            <ModalFormContainer>
                <DeliveryForm deliveryFormHandler={deliveryFormHandler}/>
            </ModalFormContainer>
            <NavBar navLinks={navLinks} isAddButton={true}/>
            <List items={items} renderItems={(item: IDelivery) => <DeliveryItem delivery={item}/>}></List>
            <PageBar page={page} clickPage={clickPage}/>
        </div>

    );
}

export default Delivery;
