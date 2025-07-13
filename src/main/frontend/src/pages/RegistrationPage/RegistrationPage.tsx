import React, {useEffect} from 'react';
import css from './RegistrationPage.module.css'
import {NavBar} from "../../components/NavBar/NavBar";
import {RegistrationForm} from "../../components/RegistrationForm/RegistrationForm";
import {IRegistration} from "../../models/IRegistration";
import {useParams} from "react-router-dom";
import {INavegante} from "../../models/INavegante";
import {useAppDispatch} from "../../hooks/redux";
import {addNavegante} from "../../redux/navegante/slice";

interface RegistrationParams {
    recordGroupId: string;
    [key: string]: string | undefined; // Индексная сигнатура: любой другой строковый ключ имеет тип string | undefined
}

const RegistrationPage = () => {
    const {recordGroupId} = useParams<RegistrationParams>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(addNavegante({
            link: `/registration/${recordGroupId}`,
            title: "Реєстраційна картка"
        }));
    }, [dispatch]);

    const saveItemHandler = (dto: IRegistration) => {
        if (dto && dto.id) {
            console.log("UPDATE")
        } else {
            console.log("CREATE")
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
