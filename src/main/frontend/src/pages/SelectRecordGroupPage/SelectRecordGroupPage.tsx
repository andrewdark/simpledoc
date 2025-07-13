import React, {useEffect, useState} from 'react';
import css from "../RegistrationPage/RegistrationPage.module.css";
import {NavBar, navLinks} from "../../components/NavBar/NavBar";
import List from "../../components/List/List";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import { getRecordGroupChildren} from "../../redux/catalog/record_group/operations";
import {IRecordGroup} from "../../models/catalog/IRecordGroup";
import {SelectRecordGroupItem} from "../../components/catalog/record_group/SelectRecordGroupItem/SelectRecordGroupItem";
import {useParams} from "react-router-dom";
import {parseStringToNumberOrDefaultZero} from "../../utils/parser";
import {useNavigate} from "react-router-dom";

interface RegistrationParams {
    selectGroupId: string;

    [key: string]: string | undefined; // Индексная сигнатура: любой другой строковый ключ имеет тип string | undefined
}

const SelectRecordGroupPage = () => {
    const navigate = useNavigate();
    const {selectGroupId} = useParams<RegistrationParams>();
    const [navLinks, setNavLinks] = useState([{link: "/", title: "Головна"}, {
        link: "/registration",
        title: "Реєстрація документів"
    }]);
    const recGroups = useAppSelector(state => state.recordGroupReducer.items);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const groupId = parseStringToNumberOrDefaultZero(selectGroupId);
        dispatch(getRecordGroupChildren({id: groupId}));
    }, [dispatch]);

    const childrenLoadHandler = (id: number | null) => {
        if (id) {
            navigate(`/select-catalog/${id}`);
            dispatch(getRecordGroupChildren({id: id}));

        }
    }

    return (
        <div className={css.registrationPage}>
            <NavBar navLinks={navLinks} isAddButton={false}/>
            <List items={recGroups} renderItems={(item: IRecordGroup) => <SelectRecordGroupItem item={item}
                                                                                                childrenLoadHandler={childrenLoadHandler}/>}/>
        </div>
    );
};

export default SelectRecordGroupPage;
