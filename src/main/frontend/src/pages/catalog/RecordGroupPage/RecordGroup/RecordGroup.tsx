import React, {useEffect} from 'react';
import css from "./RecordGroup.module.css";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {useNavigate} from "react-router-dom";
import {
    createRecordGroup,
    deleteRecordGroup,
    getAllRecordGroup,
    getRecordGroupById,
    updateRecordGroup
} from "../../../../redux/catalog/record_group/operations";
import {IRecordGroup} from "../../../../models/catalog/IRecordGroup";
import {setModal} from "../../../../redux/modal/slice";
import ModalFormContainer from "../../../../hoc/ModalFormContainer/ModalFormContainer";
import {NavBar, navLinks} from "../../../../components/NavBar/NavBar";
import List from "../../../../components/List/List";
import {PageBar} from "../../../../components/PageBar/PageBar";
import {RecordGroupForm} from "../../../../components/catalog/record_group/RecordGroupForm/RecordGroupForm";
import {RecordGroupItem} from "../../../../components/catalog/record_group/RecordGroupItem/RecordGroupItem";

const RecordGroup = () => {
    const items = useAppSelector(state => state.recordGroupReducer.items);
    const page = useAppSelector(state => state.recordGroupReducer.page);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const navLinks: navLinks[] = [{link: "/", title: "Головна"},
        {link: "/catalog", title: "Довідники"},
        {link: "/catalog/record-group", title: "Групи документів"}];

    useEffect(() => {
        dispatch(getAllRecordGroup({size: 10, number: 0}));
    }, [dispatch]);

    //---=== CRUD OPERATION HANDLERS ===---//
    const saveItemHandler = (dto: IRecordGroup) => {
        if (dto && dto.id) {
            dispatch(updateRecordGroup({id: dto.id, dto: dto}));
        } else {
            dispatch(createRecordGroup({dto: dto}));
        }

        dispatch(setModal(false));
    };
    const readItemHandler = (id: number) => {
        navigate(`/catalog/record-group/${id}`, {state: {param1: "hello", param2: "worm"}})
    };
    const updateItemHandler = async (id: number) => {
        if (id) {
            await dispatch(getRecordGroupById({id: id}))
            dispatch(setModal(true));
        }

    };
    const deleteItemHandler = (id: number) => {
        dispatch(deleteRecordGroup({id: id}));
    };

    const pageSelectionHandler = (currentPage: number) => {
        if (currentPage >= 0 && currentPage < page.totalPages) {
            dispatch(getAllRecordGroup({size: 10, number: currentPage}));
        }
    };

    return (
        <div className={css.recordGroup}>
            <ModalFormContainer>
                <RecordGroupForm formHandler={saveItemHandler}/>
            </ModalFormContainer>
            <NavBar isAddButton={true} isBackButton={true}/>
            <List items={items}
                  renderItems={(item: IRecordGroup) => <RecordGroupItem item={item} readItemHandler={readItemHandler}
                                                                        updateItemHandler={updateItemHandler}
                                                                        deleteItemHandler={deleteItemHandler}/>}></List>
            <PageBar page={page} clickPage={pageSelectionHandler}/>
        </div>

    );
};

export default RecordGroup;
