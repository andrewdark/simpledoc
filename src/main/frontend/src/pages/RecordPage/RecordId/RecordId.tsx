import React, {useEffect} from 'react';
import css from './RecordId.module.css';
import {useParams} from "react-router-dom";
import {NavBar} from "../../../components/NavBar/NavBar";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {parseStringToNumberOrDefaultZero} from "../../../utils/parser";
import {createRecord, getRecordById} from "../../../redux/record/operations";
import {RegistrationForm} from "../../../components/RegistrationForm/RegistrationForm";
import {IRecord} from "../../../models/IRecord";

interface RecordParams {
    id: string;

    [key: string]: string | undefined; // Индексная сигнатура: любой другой строковый ключ имеет тип string | undefined
}

const RecordId = () => {
    const {id} = useParams<RecordParams>();
    const record = useAppSelector(state => state.recordReducer.item);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getRecordById({id: parseStringToNumberOrDefaultZero(id)}));
    }, [dispatch]);

    const saveItemHandler = (dto: IRecord, fileList: File[]) => {
        if (dto && dto.id) {
            console.log("UPDATE")
        } else {
            console.log("CREATE: ", dto);
            //dispatch(createRecord({dto: dto, fileList: fileList}));

        }
    };

    return (
        <div className={css.recordId}>
            <NavBar isAddButton={false} isBackButton={false}/>
            <h1>Record page ID: {id}</h1>
            <div>
                {JSON.stringify(record, null, 2)}
                {record && <RegistrationForm formHandler={saveItemHandler} dto={record} readonly={true}/>}

            </div>

        </div>
    );
};

export default RecordId;
