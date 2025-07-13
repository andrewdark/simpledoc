import React, {useEffect} from 'react';
import css from './ResolutionCategory.module.css';
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {useNavigate} from "react-router-dom";
import {
    createResolutionCategory,
    deleteResolutionCategory,
    getAllResolutionCategory,
    getResolutionCategoryById,
    updateResolutionCategory
} from "../../../../redux/catalog/resolution_category/operations";
import {IResolutionCategory} from "../../../../models/catalog/IResolutionCategory";
import {setModal} from "../../../../redux/modal/slice";
import ModalFormContainer from "../../../../hoc/ModalFormContainer/ModalFormContainer";
import {NavBar, navLinks} from "../../../../components/NavBar/NavBar";
import List from "../../../../components/List/List";
import {
    ResolutionCategoryItem
} from "../../../../components/catalog/resolution_category/ResolutionCategoryItem/ResolutionCategoryItem";
import {PageBar} from "../../../../components/PageBar/PageBar";
import {
    ResolutionCategoryForm
} from "../../../../components/catalog/resolution_category/ResolutionCategoryForm/ResolutionCategoryForm";

const ResolutionCategory = () => {
    const items = useAppSelector(state => state.resolutionCategoryReducer.items);
    const page = useAppSelector(state => state.resolutionCategoryReducer.page);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const navLinks: navLinks[] = [{link: "/", title: "Головна"},
        {link: "/catalog", title: "Довідники"},
        {link: "/catalog/resolution-category", title: "Категорії резолюцій"}];

    useEffect(() => {
        dispatch(getAllResolutionCategory({size: 10, number: 0}));
    }, [dispatch]);

    //---=== CRUD OPERATION HANDLERS ===---//
    const saveItemHandler = (dto: IResolutionCategory) => {
        if (dto && dto.id) {
            dispatch(updateResolutionCategory({id: dto.id, dto: dto}));
        } else {
            dispatch(createResolutionCategory({dto: dto}));
        }

        dispatch(setModal(false));
    };
    const readItemHandler = (id: number) => {
        navigate(`/catalog/resolution-category/${id}`, {state: {param1: "hello", param2: "worm"}})
    };
    const updateItemHandler = async (id: number) => {
        if (id) {
            await dispatch(getResolutionCategoryById({id: id}))
            dispatch(setModal(true));
        }

    };
    const deleteItemHandler = (id: number) => {
        dispatch(deleteResolutionCategory({id: id}));
    };

    const pageSelectionHandler = (currentPage: number) => {
        if (currentPage >= 0 && currentPage < page.totalPages) {
            dispatch(getAllResolutionCategory({size: 10, number: currentPage}));
        }
    };

    return (
        <div className={css.resolutionCategory}>
            <ModalFormContainer>
                <ResolutionCategoryForm formHandler={saveItemHandler}/>
            </ModalFormContainer>
            <NavBar isAddButton={true} isBackButton={true}/>
            <List items={items}
                  renderItems={(item: IResolutionCategory) => <ResolutionCategoryItem item={item}
                                                                                      readItemHandler={readItemHandler}
                                                                                      updateItemHandler={updateItemHandler}
                                                                                      deleteItemHandler={deleteItemHandler}/>}></List>
            <PageBar page={page} clickPage={pageSelectionHandler}/>
        </div>

    );
};

export default ResolutionCategory;
