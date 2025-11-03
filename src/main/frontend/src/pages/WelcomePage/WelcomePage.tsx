import css from "./WelcomePage.module.css";
import {NavBar} from "../../components/NavBar/NavBar";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import React, {useEffect} from "react";
import {clearNavegante} from "../../redux/navegante/slice";
import List from "../../components/List/List";
import {deleteRecord, getAllRecord, getRecordById} from "../../redux/record/operations";
import {RecordItem} from "../../components/RecordItem/RecordItem";
import {IRecord} from "../../models/IRecord";
import {setModal} from "../../redux/modal/slice";
import {useNavigate} from "react-router-dom";
import Record from "../RecordPage/Record/Record";

const WelcomePage = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector(state => state.recordReducer.items);

    useEffect(() => {
        dispatch(clearNavegante(null));
        dispatch(getAllRecord({sort: "id", order: "DESC"}));
    }, [dispatch]);

    return (
        <div className={css.welcomePage}>
            <NavBar isAddButton={false} isBackButton={false}/>
            <h2>Останні зареєстровані документи</h2>
            <div className={css.container}>
                <Record items={items}/>
            </div>
        </div>

    );
};

export default WelcomePage;
