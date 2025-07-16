import React, {useEffect} from 'react';
import css from './CitizenStatus.module.css';
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {useNavigate} from "react-router-dom";
import {
    createCitizenStatus,
    deleteCitizenStatus,
    getAllCitizenStatus,
    getCitizenStatusById,
    updateCitizenStatus
} from "../../../../redux/catalog/citizen_status/operations";
import {ICitizenStatus} from "../../../../models/catalog/ICitizenStatus";
import {setModal} from "../../../../redux/modal/slice";
import ModalFormContainer from "../../../../hoc/ModalFormContainer/ModalFormContainer";
import {CitizenStatusForm} from "../../../../components/catalog/citizen_status/CitizenStatusForm/CitizenStatusForm";
import {NavBar} from "../../../../components/NavBar/NavBar";
import List from "../../../../components/List/List";
import {CitizenStatusItem} from "../../../../components/catalog/citizen_status/CitizenStatusItem/CitizenStatusItem";
import {PageBar} from "../../../../components/PageBar/PageBar";
import {addNavegante} from "../../../../redux/navegante/slice";

const CitizenStatus = () => {
    const items = useAppSelector(state => state.citizenStatusReducer.items);
    const page = useAppSelector(state => state.citizenStatusReducer.page);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(addNavegante({
            link: `./citizen-status`,
            title: "Соціальні статуси"
        }));
        dispatch(getAllCitizenStatus({size: 10, number: 0}));
    }, [dispatch]);

    //---=== CRUD OPERATION HANDLERS ===---//
    const saveItemHandler = (dto: ICitizenStatus) => {
        if (dto && dto.id) {
            dispatch(updateCitizenStatus({id: dto.id, dto: dto}));
        } else {
            dispatch(createCitizenStatus({dto: dto}));
        }

        dispatch(setModal(false));
    };
    const readItemHandler = (id: number) => {
        navigate(`/catalog/citizen-status/${id}`, {state: {param1: "hello", param2: "worm"}})
    };
    const updateItemHandler = async (id: number) => {
        if (id) {
            await dispatch(getCitizenStatusById({id: id}))
            dispatch(setModal(true));
        }

    };
    const deleteItemHandler = (id: number) => {
        dispatch(deleteCitizenStatus({id: id}));
    };

    const pageSelectionHandler = (currentPage: number) => {
        if (currentPage >= 0 && currentPage < page.totalPages) {
            dispatch(getAllCitizenStatus({size: 10, number: currentPage}));
        }
    };

    return (
        <div className={css.citizenStatus}>
            <ModalFormContainer>
                <CitizenStatusForm formHandler={saveItemHandler}/>
            </ModalFormContainer>
            <NavBar isAddButton={true} isBackButton={true}/>
            <List items={items}
                  renderItems={(item: ICitizenStatus) => <CitizenStatusItem item={item} readItemHandler={readItemHandler}
                                                                  updateItemHandler={updateItemHandler}
                                                                  deleteItemHandler={deleteItemHandler}/>}></List>
            <PageBar page={page} clickPage={pageSelectionHandler}/>
        </div>

    );
};

export default CitizenStatus;
