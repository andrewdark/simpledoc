import React, {useEffect, useState} from 'react';
import css from "../RegistrationPage/RegistrationPage.module.css";
import {NavBar, navLinks} from "../../components/NavBar/NavBar";
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
        dispatch(setNavegante({link: `/select-catalog/${selectGroupId}`, title: "Вибір картотеки"}));
    }, [dispatch]);

    const childrenLoadHandler = (id: number | null) => {
        if (id) {
            navigate(`/select-catalog/${id}`);
            const docGroupName = docGroups.filter(el=>el.id===id).map(el=>el.name);
            dispatch(addNavegante({link: `/select-catalog/${id}`, title: `${docGroupName}`}))
            dispatch(getRecordGroupChildren({id: id}));
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
