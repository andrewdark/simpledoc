import React, {useEffect, useState} from 'react';
import css from "./Department.module.css";
import ModalFormContainer from "../../../../hoc/ModalFormContainer/ModalFormContainer";
import {NavBar, navLinks} from "../../../../components/NavBar/NavBar";
import List from "../../../../components/List/List";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {IDepartment} from "../../../../models/catalog/IDepartment";
import DepartmentForm from "../../../../components/catalog/department/DepartmentForm/DepartmentForm";
import DepartmentItem from "../../../../components/catalog/department/DepartmentItem/DepartmentItem";
import {PageBar} from "../../../../components/PageBar/PageBar";
import {getAllDelivery} from "../../../../redux/catalog/delivery/operations";
import {createDepartment, getAllDepartment} from "../../../../redux/catalog/department/operations";

const Department = () => {
    const [modal, setModal] = useState<boolean>(false);
    const items = useAppSelector(state => state.departmentReducer.items);
    const page = useAppSelector(state => state.departmentReducer.page);
    const dispatch = useAppDispatch();
    const navLinks: navLinks[] = [{link: "/", title: "Головна"},
        {link: "/catalog", title: "Довідники"},
        {link: "/catalog/department", title: "Підрозділи(штат)"}];

    useEffect(() => {
        dispatch(getAllDepartment({size: 10, number: 0}));
    }, [dispatch]);

    const formHandler = (department: IDepartment) => {
        dispatch(createDepartment({dto: department}));
        setModal(false);
    }
    const clickPage = (currentPage: number) => {
        if (currentPage >= 0 && currentPage < page.totalPages) {
            dispatch(getAllDepartment({size: 10, number: currentPage}));
        }
    }
    return (
        <div className={css.department}>
            <ModalFormContainer visible={modal} setVisible={setModal}>
                <DepartmentForm formHandler={formHandler}/>
            </ModalFormContainer>
            <NavBar navLinks={navLinks} isAddButton={true} setVisible={setModal}/>
            <List items={items} renderItems={(item: IDepartment) => <DepartmentItem department={item}/>}></List>
            <PageBar page={page} clickPage={clickPage}/>
        </div>
    );
};

export default Department;
