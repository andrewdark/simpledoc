import css from "./SearchEnginePage.module.css";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import React, {useEffect, useState} from "react";
import {setNavegante} from "../../redux/navegante/slice";
import {NavBar} from "../../components/NavBar/NavBar";
import {getAllRecord, getAllRecordByFilter} from "../../redux/record/operations";
import List from "../../components/List/List";
import {IRecord} from "../../models/IRecord";
import {RecordItem} from "../../components/RecordItem/RecordItem";
import {CitizenForm} from "../../components/catalog/citizen/CitizenForm/CitizenForm";
import ModalFormContainer from "../../hoc/ModalFormContainer/ModalFormContainer";
import {IRecordSearchFilter} from "../../models/IRecordSearchFilter";
import {SearchEngineForm} from "../../components/SearchEngineForm/SearchEngineForm";
import {PageBar} from "../../components/PageBar/PageBar";
import {getAllCitizen} from "../../redux/catalog/citizen/operations";
import {setModal} from "../../redux/modal/slice";
import {clearRecords} from "../../redux/record/slice";
import {getAllRecordGroup} from "../../redux/catalog/record_group/operations";

const SearchEnginePage = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector(state => state.recordReducer.items);
    const page = useAppSelector(state => state.recordReducer.page);
    const [filter, setFilter] = useState<IRecordSearchFilter>();

    useEffect(() => {
        dispatch(setNavegante({id: 0, link: "/searching", title: "Пошук"}));
        dispatch(clearRecords({}));
        dispatch(getAllRecordGroup({size: 10}));
    }, [dispatch]);

    const formHandler = (curFilter: IRecordSearchFilter) => {
        console.log("SEARCH: ", curFilter);
        setFilter(curFilter);
        dispatch(getAllRecordByFilter({size: 10, number: 0, sort: "id", order:"ASC", filter: curFilter}));
        dispatch(setModal(false));
    };
    const pageSelectionHandler = (currentPage: number) => {
        if (currentPage >= 0 && currentPage < page.totalPages) {
            dispatch(getAllRecordByFilter({size: 10, number: currentPage, sort: "id", order:"ASC", filter: filter}));
        }
    };
    return (
        <div className={css.searchEnginePage}>
            <NavBar isAddButton={true} isBackButton={true}/>
            <h2>SearchEngine</h2>
            <div className={css.container}>
                <List items={items}
                      renderItems={(item: IRecord) => <RecordItem item={item}/>}></List>
                <PageBar page={page} clickPage={pageSelectionHandler}/>
            </div>
            <ModalFormContainer>
                <SearchEngineForm formHandler={formHandler}/>
            </ModalFormContainer>
        </div>
    );
}

export default SearchEnginePage;
