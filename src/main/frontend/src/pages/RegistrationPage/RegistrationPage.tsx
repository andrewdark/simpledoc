import React from 'react';
import css from './RegistrationPage.module.css'
import {NavBar, navLinks} from "../../components/NavBar/NavBar";
import {RegistrationForm} from "../../components/RegistrationForm/RegistrationForm";
import {IRegistration} from "../../models/IRegistration";
import {useParams} from "react-router-dom";

interface RegistrationParams {
    recordGroupId: string;

    [key: string]: string | undefined; // Индексная сигнатура: любой другой строковый ключ имеет тип string | undefined
}

const RegistrationPage = () => {
    const {recordGroupId} = useParams<RegistrationParams>();
    const navLinks: navLinks[] = [{link: "/", title: "Головна"}, {
        link: "/select-catalog/0",
        title: "Реєстрація документів"
    },{link: "/"+{recordGroupId}, title: ""+{recordGroupId}}];
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
                <NavBar navLinks={navLinks} isAddButton={false}/>
                <RegistrationForm formHandler={saveItemHandler}/>
            </div>
            : <div>
                <h1>ВКАЖІТЬ ГРУПУ ДОКУМЕНТУ</h1>
            </div>
    );
};

export default RegistrationPage;
