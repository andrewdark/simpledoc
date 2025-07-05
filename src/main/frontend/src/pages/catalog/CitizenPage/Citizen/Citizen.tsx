import React, {useEffect} from 'react';
import css from './Citizen.module.css';
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {NavBar, navLinks} from "../../../../components/NavBar/NavBar";
import ModalFormContainer from "../../../../hoc/ModalFormContainer/ModalFormContainer";
import CitizenForm from "../../../../components/catalog/citizen/CitizenForm/CitizenForm";
import {ICitizen} from "../../../../models/catalog/ICitizen";
import {setModal} from "../../../../redux/modal/slice";
import List from "../../../../components/List/List";
import {PageBar} from "../../../../components/PageBar/PageBar";
import {getAllCitizen} from "../../../../redux/catalog/citizen/operations";
import {CitizenItem} from "../../../../components/catalog/citizen/CitizenItem/CitizenItem";
import {useNavigate} from "react-router-dom";

const Citizen = () => {
    const items = useAppSelector(state => state.citizenReducer.items);
    const page = useAppSelector(state => state.citizenReducer.page);
    const navLinks: navLinks[] = [{link: "/", title: "Головна"}, {link: "/catalog", title: "Довідники"}, {link: "/catalog/citizen", title: "Громадяни"}];
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getAllCitizen({size: 10, number: 0}));
    }, [dispatch]);

    //---=== CRUD OPERATION HANDLERS ===---//
    const createItemHandler = (citizen: ICitizen) => {
        // dispatch(createCitizen({dto: citizen}));
        dispatch(setModal(false));
    };
    const readItemHandler = (id: number) => {
        if(id && id > 0){
            navigate(`/catalog/citizen/${id}`, {state:{param1:"hello", param2:"worm"}})
        }
    };
    const updateItemHandler = (id: number) => {
        dispatch(setModal(false));
    };
    const deleteItemHandler = (id: number) => {

    };

    const pageSelectionHandler = (currentPage: number) => {
        if (currentPage >= 0 && currentPage < page.totalPages) {
            dispatch(getAllCitizen({size: 10, number: currentPage}));
        }
    };


    return (
        <div className={css.citizen}>
            <ModalFormContainer>
                <CitizenForm formHandler={createItemHandler}/>
            </ModalFormContainer>
            <NavBar navLinks={navLinks} isAddButton={true}/>
            <List items={items}
                  renderItems={(item: ICitizen) => <CitizenItem item={item} readItemHandler={readItemHandler}
                                                                updateItemHandler={updateItemHandler}
                                                                deleteItemHandler={deleteItemHandler}/>}></List>
            <PageBar page={page} clickPage={pageSelectionHandler}/>
        </div>
    );
};

export default Citizen;
