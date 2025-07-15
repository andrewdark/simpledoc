import React, {useEffect} from 'react';
import css from './RegistrationPage.module.css'
import {NavBar} from "../../components/NavBar/NavBar";
import {RegistrationForm} from "../../components/RegistrationForm/RegistrationForm";
import {useParams} from "react-router-dom";
import {useAppDispatch} from "../../hooks/redux";
import {addNavegante} from "../../redux/navegante/slice";
import {getRecordGroupById} from "../../redux/catalog/record_group/operations";
import {parseStringToNumberOrDefaultZero} from "../../utils/parser";
import {createRecord} from "../../redux/record/operations";
import {IRecord} from "../../models/IRecord";

interface RegistrationParams {
    recordGroupId: string;
    [key: string]: string | undefined; // Индексная сигнатура: любой другой строковый ключ имеет тип string | undefined
}

const RegistrationPage = () => {
    const {recordGroupId} = useParams<RegistrationParams>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const groupId = parseStringToNumberOrDefaultZero(recordGroupId);
        dispatch(addNavegante({
            link: `/registration/${recordGroupId}`,
            title: "Реєстраційна картка"
        }));
        dispatch(getRecordGroupById({id: groupId}));
    }, [dispatch]);

    const saveItemHandler = (dto: IRecord) => {
        if (dto && dto.id) {
            console.log("UPDATE")
        } else {
            console.log("CREATE: ", dto);
            dispatch(createRecord({dto:dto}));

        }
    };

    return (
        recordGroupId ?
            <div className={css.registrationPage}>
                <NavBar isAddButton={false} isBackButton={true}/>
                <RegistrationForm formHandler={saveItemHandler}/>
            </div>
            : <div>
                <h1>ВКАЖІТЬ ГРУПУ ДОКУМЕНТУ</h1>
            </div>
    );
};

export default RegistrationPage;
