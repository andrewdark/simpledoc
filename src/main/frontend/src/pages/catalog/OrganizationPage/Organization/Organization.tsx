import React, {useEffect} from 'react';
import css from './Organization.module.css';
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {useNavigate} from "react-router-dom";
import {
    createOrganization, deleteOrganization,
    getAllOrganization,
    getOrganizationById,
    updateOrganization
} from "../../../../redux/catalog/organization/operations";
import {IOrganization} from "../../../../models/catalog/IOrganization";
import {setModal} from "../../../../redux/modal/slice";
import ModalFormContainer from "../../../../hoc/ModalFormContainer/ModalFormContainer";
import {OrganizationForm} from "../../../../components/catalog/organization/OrganizationForm/OrganizationForm";
import {NavBar, navLinks} from "../../../../components/NavBar/NavBar";
import List from "../../../../components/List/List";
import {OrganizationItem} from "../../../../components/catalog/organization/OrganizationItem/OrganizationItem";
import {PageBar} from "../../../../components/PageBar/PageBar";

const Organization = () => {
    const items = useAppSelector(state => state.organizationReducer.items);
    const page = useAppSelector(state => state.organizationReducer.page);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const navLinks: navLinks[] = [{link: "/", title: "Головна"},
        {link: "/catalog", title: "Довідники"},
        {link: "/catalog/organization", title: "Підприємства"}];

    useEffect(() => {
        dispatch(getAllOrganization({size: 10, number: 0}));
    }, [dispatch]);

    //---=== CRUD OPERATION HANDLERS ===---//
    const saveItemHandler = (dto: IOrganization) => {
        if (dto && dto.id) {
            dispatch(updateOrganization({id: dto.id, dto: dto}));
        } else {
            dispatch(createOrganization({dto: dto}));
        }

        dispatch(setModal(false));
    };
    const readItemHandler = (id: number) => {
        navigate(`/catalog/organization/${id}`, {state: {param1: "hello", param2: "worm"}})
    };
    const updateItemHandler = async (id: number) => {
        if (id) {
            await dispatch(getOrganizationById({id: id}))
            dispatch(setModal(true));
        }

    };
    const deleteItemHandler = (id: number) => {
        dispatch(deleteOrganization({id: id}));
    };

    const pageSelectionHandler = (currentPage: number) => {
        if (currentPage >= 0 && currentPage < page.totalPages) {
            dispatch(getAllOrganization({size: 10, number: currentPage}));
        }
    };

    return (
        <div className={css.organization}>
            <ModalFormContainer>
                <OrganizationForm formHandler={saveItemHandler}/>
            </ModalFormContainer>
            <NavBar navLinks={navLinks} isAddButton={true}/>
            <List items={items}
                  renderItems={(item: IOrganization) => <OrganizationItem item={item} readItemHandler={readItemHandler}
                                                                  updateItemHandler={updateItemHandler}
                                                                  deleteItemHandler={deleteItemHandler}/>}></List>
            <PageBar page={page} clickPage={pageSelectionHandler}/>
        </div>

    );
};
export default Organization;
