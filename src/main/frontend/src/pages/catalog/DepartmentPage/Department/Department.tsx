import React, {useEffect} from 'react';
import css from "./Department.module.css";
import ModalFormContainer from "../../../../hoc/ModalFormContainer/ModalFormContainer";
import {NavBar, navLinks} from "../../../../components/NavBar/NavBar";
import List from "../../../../components/List/List";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {IDepartment} from "../../../../models/catalog/IDepartment";
import {DepartmentForm} from "../../../../components/catalog/department/DepartmentForm/DepartmentForm";
import {DepartmentItem} from "../../../../components/catalog/department/DepartmentItem/DepartmentItem";
import {PageBar} from "../../../../components/PageBar/PageBar";
import {
    createDepartment,
    deleteDepartment,
    getAllDepartment, getDepartmentById,
    updateDepartment
} from "../../../../redux/catalog/department/operations";
import {useNavigate} from "react-router-dom";
import {setModal} from "../../../../redux/modal/slice";

const Department = () => {
    const items = useAppSelector(state => state.departmentReducer.items);
    const page = useAppSelector(state => state.departmentReducer.page);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const navLinks: navLinks[] = [{link: "/", title: "Головна"},
        {link: "/catalog", title: "Довідники"},
        {link: "/catalog/department", title: "Підрозділи, посадові особи"}];

    useEffect(() => {
        dispatch(getAllDepartment({size: 10, number: 0}));
    }, [dispatch]);

    //---=== CRUD OPERATION HANDLERS ===---//
    const saveItemHandler = (dto: IDepartment) => {
        if (dto && dto.id) {
            dispatch(updateDepartment({id: dto.id, dto: dto}));
        } else {
            dispatch(createDepartment({dto: dto}));
        }

        dispatch(setModal(false));
    };
    const readItemHandler = (id: number) => {
        navigate(`/catalog/department/${id}`, {state: {param1: "hello", param2: "worm"}})
    };
    const updateItemHandler = async (id: number) => {
        if (id) {
            await dispatch(getDepartmentById({id: id}))
            dispatch(setModal(true));
        }

    };
    const deleteItemHandler = (id: number) => {
        dispatch(deleteDepartment({id: id}));
    };

    const pageSelectionHandler = (currentPage: number) => {
        if (currentPage >= 0 && currentPage < page.totalPages) {
            dispatch(getAllDepartment({size: 10, number: currentPage}));
        }
    };

    return (
        <div className={css.department}>
            <ModalFormContainer>
               <DepartmentForm formHandler={saveItemHandler}/>
            </ModalFormContainer>
            <NavBar isAddButton={true} isBackButton={true}/>
            <List items={items}
                  renderItems={(item: IDepartment) => <DepartmentItem item={item} readItemHandler={readItemHandler}
                                                                      updateItemHandler={updateItemHandler}
                                                                      deleteItemHandler={deleteItemHandler}/>}></List>
            <PageBar page={page} clickPage={pageSelectionHandler}/>
        </div>
    );
};

export default Department;
