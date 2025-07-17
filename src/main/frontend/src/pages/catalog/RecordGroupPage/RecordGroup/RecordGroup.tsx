import React, {useEffect} from 'react';
import css from "./RecordGroup.module.css";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {useNavigate} from "react-router-dom";
import {
    createRecordGroup, createRecordGroupChildren,
    deleteRecordGroup,
    getRecordGroupById, getRecordGroupChildren,
    updateRecordGroup
} from "../../../../redux/catalog/record_group/operations";
import {IRecordGroup} from "../../../../models/catalog/IRecordGroup";
import {setModal} from "../../../../redux/modal/slice";
import ModalFormContainer from "../../../../hoc/ModalFormContainer/ModalFormContainer";
import {NavBar} from "../../../../components/NavBar/NavBar";
import List from "../../../../components/List/List";
import {PageBar} from "../../../../components/PageBar/PageBar";
import {RecordGroupForm} from "../../../../components/catalog/record_group/RecordGroupForm/RecordGroupForm";
import {RecordGroupItem} from "../../../../components/catalog/record_group/RecordGroupItem/RecordGroupItem";
import {addNavegante, setNavegante} from "../../../../redux/navegante/slice";
import {parseStringToNumberOrDefaultZero} from "../../../../utils/parser";
import {useParams} from "react-router-dom";

interface RecordGroupParams {
    id: string;

    [key: string]: string | undefined; // Индексная сигнатура: любой другой строковый ключ имеет тип string | undefined
}

const RecordGroup = () => {
    const {id} = useParams<RecordGroupParams>();
    const items: IRecordGroup[] = useAppSelector(state => state.recordGroupReducer.items);
    const page = useAppSelector(state => state.recordGroupReducer.page);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const groupId = parseStringToNumberOrDefaultZero(id);
        console.log("groupId", groupId);
        dispatch(getRecordGroupChildren({id: groupId}));
        if (groupId <= 0) {
            dispatch(setNavegante({id: -1, link: `/catalog`, title: "Довідники"}));
            dispatch(addNavegante({id: 0, link: `/catalog/record-group/${groupId}`, title: "Групи документів"}));
        } else {
            const docGroupName = items.find(el => el.id === groupId)?.name;
            if (docGroupName) {
                dispatch(addNavegante({
                    id: `${groupId}`,
                    link: `/catalog/record-group/${groupId}`,
                    title: `${docGroupName}`
                }))
            }

        }

    }, [dispatch, id]);

    const childrenLoadHandler = (id: number | null) => {
        if (id) {
            navigate(`/catalog/record-group/${id}`);
        }
    }

    //---=== CRUD OPERATION HANDLERS ===---//
    const saveItemHandler = (dto: IRecordGroup) => {
        if (dto && dto.id) {
            dispatch(updateRecordGroup({id: dto.id, dto: dto}));
        } else {
            const parentId: number = parseStringToNumberOrDefaultZero(id);
            if (parentId > 0) {
                dispatch(createRecordGroupChildren({id: parentId, dto: dto}));
            } else {
                dispatch(createRecordGroup({dto: dto}));
            }

        }

        dispatch(setModal(false));
    };
    const readItemHandler = (id: number) => {
        navigate(`/catalog/record-group/${id}/details`, {state: {param1: "hello", param2: "worm"}})
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
            const groupId = parseStringToNumberOrDefaultZero(id);
            dispatch(getRecordGroupChildren({id: groupId, size: 10, number: currentPage}));
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
                                                                        deleteItemHandler={deleteItemHandler}
                                                                        childrenLoadHandler={childrenLoadHandler}/>}></List>
            <PageBar page={page} clickPage={pageSelectionHandler}/>
        </div>

    );
};

export default RecordGroup;
