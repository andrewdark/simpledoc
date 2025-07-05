import React, {useState} from 'react';
import css from './Citizen.module.css';
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {NavBar, navLinks} from "../../../../components/NavBar/NavBar";
import ModalFormContainer from "../../../../hoc/ModalFormContainer/ModalFormContainer";
import CitizenForm from "../../../../components/catalog/citizen/CitizenForm/CitizenForm";
import {ICitizen} from "../../../../models/catalog/ICitizen";
import {setModal} from "../../../../redux/modal/slice";

const Citizen = () => {
    const items = useAppSelector(state => state.deliveryReducer.items);
    const page = useAppSelector(state => state.deliveryReducer.page);
    const isVisible: boolean = useAppSelector(state => state.modalReducer.visible);
    const navLinks: navLinks[] = [{link: "/", title: "Головна"}, {
        link: "/catalog",
        title: "Довідники"
    }, {link: "/catalog/citizen", title: "Громадяни"}];

    const dispatch = useAppDispatch();

    const formHandler = (citizen: ICitizen) => {
        // dispatch(createCitizen({dto: citizen}));
        dispatch(setModal(false));
        console.log("CREATE CITIZEN: ", citizen);
    }

    return (
        <div className={css.citizen}>
            <ModalFormContainer>
                <CitizenForm formHandler={formHandler}/>
            </ModalFormContainer>
            <NavBar navLinks={navLinks} isAddButton={true}/>
        </div>
    );
};

export default Citizen;
