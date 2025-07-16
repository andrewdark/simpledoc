import React, {useEffect, useState} from 'react';
import css from "../RegistrationPage/RegistrationPage.module.css";
import {NavBar} from "../../components/NavBar/NavBar";
import List from "../../components/List/List";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {getRecordGroupChildren} from "../../redux/catalog/record_group/operations";
import {IRecordGroup} from "../../models/catalog/IRecordGroup";
import {SelectRecordGroupItem} from "../../components/catalog/record_group/SelectRecordGroupItem/SelectRecordGroupItem";
import {useParams} from "react-router-dom";
import {parseStringToNumberOrDefaultZero} from "../../utils/parser";
import {useNavigate} from "react-router-dom";
import {INavegante} from "../../models/INavegante";
import {addNavegante, setNavegante} from "../../redux/navegante/slice";

interface RegistrationParams {
    selectGroupId: string;

    [key: string]: string | undefined; // Индексная сигнатура: любой другой строковый ключ имеет тип string | undefined
}

const SelectRecordGroupPage = () => {
    const navigate = useNavigate();
    const {selectGroupId} = useParams<RegistrationParams>();
    const links: INavegante[] = useAppSelector(state => state.naveganteReducer.navList);
    const docGroups: IRecordGroup[] = useAppSelector(state => state.recordGroupReducer.items);

    const recGroups = useAppSelector(state => state.recordGroupReducer.items);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const groupId = parseStringToNumberOrDefaultZero(selectGroupId);
        dispatch(getRecordGroupChildren({id: groupId}));

        if (groupId <= 0) {
            dispatch(setNavegante({id:0 ,link: `/select-catalog/${groupId}`, title: "Вибір картотеки"}));
        } else {
            const docGroupName = docGroups.filter(el => el.id === groupId).map(el => el.name);
            dispatch(addNavegante({id:`${groupId}` ,link: `/select-catalog/${groupId}`, title: `${docGroupName}`}))
        }

    }, [dispatch, selectGroupId]);

    const childrenLoadHandler = (id: number | null) => {
        if (id) {
            navigate(`/select-catalog/${id}`);
        }
    }

    return (
        <div className={css.registrationPage}>
            <NavBar isAddButton={false} isBackButton={true}/>
            <List items={recGroups} renderItems={(item: IRecordGroup) => <SelectRecordGroupItem item={item}
                                                                                                childrenLoadHandler={childrenLoadHandler}/>}/>
        </div>
    );
};

export default SelectRecordGroupPage;
