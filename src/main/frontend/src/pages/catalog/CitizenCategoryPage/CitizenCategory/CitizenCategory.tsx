import React, {useEffect} from 'react';
import css from './CitizenCategory.module.css';
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {useNavigate} from "react-router-dom";
import {
    createCitizenCategory,
    deleteCitizenCategory,
    getAllCitizenCategory,
    getCitizenCategoryById,
    updateCitizenCategory
} from "../../../../redux/catalog/citizen_category/operations";
import {ICitizenCategory} from "../../../../models/catalog/ICitizenCategory";
import {setModal} from "../../../../redux/modal/slice";
import ModalFormContainer from "../../../../hoc/ModalFormContainer/ModalFormContainer";
import {
    CitizenCategoryForm
} from "../../../../components/catalog/citizen_category/CitizenCategoryForm/CitizenCategoryForm";
import {NavBar, navLinks} from "../../../../components/NavBar/NavBar";
import List from "../../../../components/List/List";
import {
    CitizenCategoryItem
} from "../../../../components/catalog/citizen_category/CitizenCategoryItem/CitizenCategoryItem";
import {PageBar} from "../../../../components/PageBar/PageBar";

const CitizenCategory = () => {
    const items = useAppSelector(state => state.citizenCategoryReducer.items);
    const page = useAppSelector(state => state.citizenCategoryReducer.page);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const navLinks: navLinks[] = [{link: "/", title: "Головна"},
        {link: "/catalog", title: "Довідники"},
        {link: "/catalog/citizen-category", title: "Соціальні категорії"}];

    useEffect(() => {
        dispatch(getAllCitizenCategory({size: 10, number: 0}));
    }, [dispatch]);

    //---=== CRUD OPERATION HANDLERS ===---//
    const saveItemHandler = (dto: ICitizenCategory) => {
        if (dto && dto.id) {
            dispatch(updateCitizenCategory({id: dto.id, dto: dto}));
        } else {
            dispatch(createCitizenCategory({dto: dto}));
        }

        dispatch(setModal(false));
    };
    const readItemHandler = (id: number) => {
        navigate(`/catalog/citizenCategory/${id}`, {state: {param1: "hello", param2: "worm"}})
    };
    const updateItemHandler = async (id: number) => {
        if (id) {
            await dispatch(getCitizenCategoryById({id: id}))
            dispatch(setModal(true));
        }

    };
    const deleteItemHandler = (id: number) => {
        dispatch(deleteCitizenCategory({id: id}));
    };

    const pageSelectionHandler = (currentPage: number) => {
        if (currentPage >= 0 && currentPage < page.totalPages) {
            dispatch(getAllCitizenCategory({size: 10, number: currentPage}));
        }
    };

    return (
        <div className={css.citizenCategory}>
            <ModalFormContainer>
                <CitizenCategoryForm formHandler={saveItemHandler}/>
            </ModalFormContainer>
            <NavBar navLinks={navLinks} isAddButton={true}/>
            <List items={items}
                  renderItems={(item: ICitizenCategory) => <CitizenCategoryItem item={item} readItemHandler={readItemHandler}
                                                                  updateItemHandler={updateItemHandler}
                                                                  deleteItemHandler={deleteItemHandler}/>}></List>
            <PageBar page={page} clickPage={pageSelectionHandler}/>
        </div>

    );
};

export default CitizenCategory;
