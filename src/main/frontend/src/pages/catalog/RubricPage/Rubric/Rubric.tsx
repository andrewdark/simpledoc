import React, {useEffect} from 'react';
import css from './Rubric.module.css';
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {useNavigate} from "react-router-dom";
import {
    createRubric,
    deleteRubric,
    getAllRubric,
    getRubricById,
    updateRubric
} from "../../../../redux/catalog/rubric/operations";
import {IRubric} from "../../../../models/catalog/IRubric";
import {setModal} from "../../../../redux/modal/slice";
import ModalFormContainer from "../../../../hoc/ModalFormContainer/ModalFormContainer";
import {NavBar} from "../../../../components/NavBar/NavBar";
import List from "../../../../components/List/List";
import {RubricItem} from "../../../../components/catalog/rubric/RubricItem/RubricItem";
import {PageBar} from "../../../../components/PageBar/PageBar";
import {RubricForm} from "../../../../components/catalog/rubric/RubricForm/RubricForm";
import {addNavegante} from "../../../../redux/navegante/slice";

;

const Rubric = () => {
    const items = useAppSelector(state => state.rubricReducer.items);
    const page = useAppSelector(state => state.rubricReducer.page);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllRubric({size: 10, number: 0}));
        dispatch(addNavegante({
            link: `./rubric`,
            title: "Рубрикатор"
        }));
    }, [dispatch]);

    //---=== CRUD OPERATION HANDLERS ===---//
    const saveItemHandler = (dto: IRubric) => {
        if (dto && dto.id) {
            dispatch(updateRubric({id: dto.id, dto: dto}));
        } else {
            dispatch(createRubric({dto: dto}));
        }

        dispatch(setModal(false));
    };
    const readItemHandler = (id: number) => {
        navigate(`./${id}`, {state: {param1: "hello", param2: "worm"}})
    };
    const updateItemHandler = async (id: number) => {
        if (id) {
            await dispatch(getRubricById({id: id}))
            dispatch(setModal(true));
        }

    };
    const deleteItemHandler = (id: number) => {
        dispatch(deleteRubric({id: id}));
    };

    const pageSelectionHandler = (currentPage: number) => {
        if (currentPage >= 0 && currentPage < page.totalPages) {
            dispatch(getAllRubric({size: 10, number: currentPage}));
        }
    };

    return (
        <div className={css.rubric}>
            <ModalFormContainer>
                <RubricForm formHandler={saveItemHandler}/>
            </ModalFormContainer>
            <NavBar isAddButton={true} isBackButton={true}/>
            <List items={items}
                  renderItems={(item: IRubric) => <RubricItem item={item} readItemHandler={readItemHandler}
                                                                  updateItemHandler={updateItemHandler}
                                                                  deleteItemHandler={deleteItemHandler}/>}></List>
            <PageBar page={page} clickPage={pageSelectionHandler}/>
        </div>

    );
};

export default Rubric;
