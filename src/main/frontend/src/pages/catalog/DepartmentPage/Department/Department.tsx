import React, {useEffect} from 'react';
import css from "./Department.module.css";
import ModalFormContainer from "../../../../hoc/ModalFormContainer/ModalFormContainer";
import {NavBar, navLinks} from "../../../../components/NavBar/NavBar";
import List from "../../../../components/List/List";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {IDepartment} from "../../../../models/catalog/IDepartment";
import DepartmentForm from "../../../../components/catalog/department/DepartmentForm/DepartmentForm";
import {DepartmentItem} from "../../../../components/catalog/department/DepartmentItem/DepartmentItem";
import {PageBar} from "../../../../components/PageBar/PageBar";
import {getAllDepartment} from "../../../../redux/catalog/department/operations";
import {setModal} from "../../../../redux/modal/slice";
import {IDelivery} from "../../../../models/catalog/IDelivery";
import {createDelivery, deleteDelivery} from "../../../../redux/catalog/delivery/operations";
import {getAllCitizen} from "../../../../redux/catalog/citizen/operations";
import {useNavigate} from "react-router-dom";

const Department = () => {
    const items = useAppSelector(state => state.departmentReducer.items);
    const page = useAppSelector(state => state.departmentReducer.page);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const navLinks: navLinks[] = [{link: "/", title: "Головна"},
        {link: "/catalog", title: "Довідники"},
        {link: "/catalog/department", title: "Підрозділи(штат)"}];

    useEffect(() => {
        dispatch(getAllDepartment({size: 10, number: 0}));
    }, [dispatch]);

    //---=== CRUD OPERATION HANDLERS ===---//
    const createItemHandler = (dto: IDelivery) => {
        dispatch(createDelivery({dto: dto}));
        dispatch(setModal(false));
    };
    const readItemHandler = (id: number) => {
        navigate(`/catalog/delivery/${id}`, {state: {param1: "hello", param2: "worm"}})
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
        <div className={css.department}>
            <ModalFormContainer>
                <DepartmentForm formHandler={createItemHandler}/>
            </ModalFormContainer>
            <NavBar navLinks={navLinks} isAddButton={true}/>
            <List items={items}
                  renderItems={(item: IDepartment) => <DepartmentItem item={item} readItemHandler={readItemHandler}
                                                                      updateItemHandler={updateItemHandler}
                                                                      deleteItemHandler={deleteItemHandler}/>}></List>
            <PageBar page={page} clickPage={pageSelectionHandler}/>
        </div>
    );
};

export default Department;
