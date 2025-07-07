import React, {useEffect} from 'react';
import css from './Citizen.module.css';
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {NavBar, navLinks} from "../../../../components/NavBar/NavBar";
import ModalFormContainer from "../../../../hoc/ModalFormContainer/ModalFormContainer";
import {setModal} from "../../../../redux/modal/slice";
import List from "../../../../components/List/List";
import {PageBar} from "../../../../components/PageBar/PageBar";
import {useNavigate} from "react-router-dom";
import {
    createCitizen,
    deleteCitizen,
    getAllCitizen,
    getCitizenById,
    updateCitizen
} from "../../../../redux/catalog/citizen/operations";
import {ICitizen} from "../../../../models/catalog/ICitizen";
import {CitizenForm} from "../../../../components/catalog/citizen/CitizenForm/CitizenForm";
import {CitizenItem} from "../../../../components/catalog/citizen/CitizenItem/CitizenItem";

const Citizen = () => {
    const items = useAppSelector(state => state.citizenReducer.items);
    const page = useAppSelector(state => state.citizenReducer.page);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const navLinks: navLinks[] = [{link: "/", title: "Головна"},
        {link: "/catalog", title: "Довідники"},
        {link: "/catalog/citizen", title: "Фізичні особи"}];

    useEffect(() => {
        dispatch(getAllCitizen({size: 10, number: 0}));
    }, [dispatch]);

    //---=== CRUD OPERATION HANDLERS ===---//
    const saveItemHandler = (dto: ICitizen) => {
        if (dto && dto.id) {
            dispatch(updateCitizen({id: dto.id, dto: dto}));
        } else {
            dispatch(createCitizen({dto: dto}));
        }

        dispatch(setModal(false));
    };
    const readItemHandler = (id: number) => {
        navigate(`/catalog/citizen/${id}`, {state: {param1: "hello", param2: "worm"}})
    };
    const updateItemHandler = async (id: number) => {
        if (id) {
            await dispatch(getCitizenById({id: id}))
            dispatch(setModal(true));
        }

    };
    const deleteItemHandler = (id: number) => {
        dispatch(deleteCitizen({id: id}));
    };

    const pageSelectionHandler = (currentPage: number) => {
        if (currentPage >= 0 && currentPage < page.totalPages) {
            dispatch(getAllCitizen({size: 10, number: currentPage}));
        }
    };

    return (
        <div className={css.citizen}>
            <ModalFormContainer>
                <CitizenForm formHandler={saveItemHandler}/>
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
