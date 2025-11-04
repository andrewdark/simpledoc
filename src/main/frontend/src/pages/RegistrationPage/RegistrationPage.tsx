import React, {useEffect} from 'react';
import css from './RegistrationPage.module.css'
import {NavBar} from "../../components/NavBar/NavBar";
import {RegistrationForm} from "../../components/RegistrationForm/RegistrationForm";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {addNavegante} from "../../redux/navegante/slice";
import {getRecordGroupById} from "../../redux/catalog/record_group/operations";
import {parseStringToNumberOrDefaultZero} from "../../utils/parser";
import {createRecord} from "../../redux/record/operations";
import {IRecord} from "../../models/IRecord";
import {IRecordGroup} from "../../models/catalog/IRecordGroup";
import {clearRecordGroups} from "../../redux/catalog/record_group/slice";

interface RegistrationParams {
    recordGroupId: string;

    [key: string]: string | undefined; // Индексная сигнатура: любой другой строковый ключ имеет тип string | undefined
}

const RegistrationPage = () => {
    const navigate = useNavigate();
    const {recordGroupId} = useParams<RegistrationParams>();
    const recordGroupInit: IRecordGroup | null = useAppSelector(state => state.recordGroupReducer.item);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(clearRecordGroups());
        const groupId = parseStringToNumberOrDefaultZero(recordGroupId);
        dispatch(addNavegante({
            link: `.`,
            title: "Реєстраційна картка"
        }));
        dispatch(getRecordGroupById({id: groupId}));
    }, [dispatch]);

    const saveItemHandler = async (dto: IRecord, fileList: File[]) => {
        if (dto && dto.id) {
            console.log("UPDATE")
        } else {
            console.log("CREATE: ", dto);
            const resultAction = await dispatch(createRecord({dto: dto, fileList: fileList})).unwrap();

            const newId = resultAction.id;

            if(newId){
               navigate(`/record/${newId}`, {state: {readonly: true, param2: "worm"}});
            }
        }
    };

    //TODO: SEE  RecordId
    return (
        recordGroupInit ?
            <div className={css.registrationPage}>
                <NavBar isAddButton={false} isBackButton={true}/>
                <RegistrationForm formHandler={saveItemHandler} dto={{recordGroup: recordGroupInit}}/>
            </div>
            : <div>
                <h1>ВКАЖІТЬ ГРУПУ ДОКУМЕНТУ</h1>
            </div>
    );
};

export default RegistrationPage;
