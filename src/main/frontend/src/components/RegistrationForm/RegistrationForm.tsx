import React, {ChangeEvent, FC, FormEvent, useState} from 'react';
import {IRecord} from "../../models/IRecord";
import css from "./RegistrationForm.module.css";
import DatePicker from 'react-datepicker';
import {IRecordGroup} from "../../models/catalog/IRecordGroup";
import {ICorrespondent} from "../../models/ICorrespondent";
import {IDelivery} from "../../models/catalog/IDelivery";
import {IResolution} from "../../models/IResolution";
import {IFileLink} from "../../models/IFileLink";
import {IRubric} from "../../models/catalog/IRubric";
import {VscNewFile, VscSaveAs} from "react-icons/vsc";
import {uk} from "date-fns/locale";
import {parseStringToNumberOrDefaultZero} from "../../utils/parser";


interface RegistrationFormProps {
    formHandler: (registration: IRecord) => void;
}

export const RegistrationForm: FC<RegistrationFormProps> = (props) => {
    const [id, setId] = useState<number | null>(null);
    const [orderNum, setOrderNum] = useState<number>(0);
    const [regNum, setRegNum] = useState<string>('');
    const [regDate, setRegDate] = useState<Date | null>(null); //Date;
    const [consist, setConsist] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [note, setNote] = useState<string>('');
    const [collective, setCollective] = useState<boolean>(false);
    const [signCount, setSignCount] = useState<number>(0);

    const [recordGroup, setRecordGroup] = useState<string>(''); //IRecordGroup | null;
    const [correspondents, setCorrespondents] = useState<string>(''); //ICorrespondent[];
    const [delivery, setDelivery] = useState<string>(''); //IDelivery;
    const [resolutions, setResolutions] = useState<string>(''); //IResolution[];
    const [files, setFiles] = useState<string>(''); //IFileLink[];
    const [rubrics, setRubrics] = useState<string>(''); //IRubric[];

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Предотвращаем перезагрузку страницы
        console.log("FORM-DATA: ", {orderNum}, " ", {regNum}, " від:", {regDate});
        // Здесь можно отправить данные на сервер
    };
    const handleRegNumChange = (event: ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        setRegNum(val);
    };
    const handleOrderNumChange = (event: ChangeEvent<HTMLInputElement>) => {
        const val = parseStringToNumberOrDefaultZero(event.target.value);
        setOrderNum(val);
    };

    return <form className={css.registrationForm} onSubmit={handleSubmit}>
        <div className={css.registrationFormContainer}>
            <div className={css.navigationBar}>
                <button type="button" className={css.someButton}>
                    <VscNewFile size={24}/>
                </button>

                <button type="submit" className={css.submitButton}>
                    <VscSaveAs size={24}/>
                </button>
            </div>
            <div className={css.regInfoGroup}>
                <div className={css.numberOfDocGroup}>
                    <label>№</label>
                    <input type="text" className={css.singleInputForNumber} value={regNum}
                           onChange={handleRegNumChange}/>
                    <input type="text" className={css.singleInputForNumber} value="/"/>
                    <input type="text" className={css.singleInputForNumber} value={orderNum}
                           onChange={handleOrderNumChange}/>
                </div>
                <label>від:</label>
                <DatePicker
                    className={css.datePickerField}
                    locale={uk}
                    selected={regDate} // Текущая выбранная дата
                    onChange={(date) => setRegDate(date)} // Функция для обновления состояния
                    dateFormat="yyyy-MM-dd" // Формат отображения даты
                />
            </div>
            <div className={css.bodyContentGroup}>
                <div className={css.mainContentGroup}>
                    <div className={css.mainContentCorrespondents}>
                        <div className={css.formField}>
                            <label>Кореспондент: </label>
                            <input/>
                        </div>
                       
                    </div>
                    <div className={css.mainContentAttributes}></div>
                </div>
                <div className={css.additionalContentGroup}>
                    <div className={css.additionalContentAttributes}>
                        <div className={css.formField}>
                            <label>Склад: </label>
                            <input/>
                        </div>

                        <div className={css.formField}>
                            <label>Доставка: </label>
                            <input/>
                        </div>

                    </div>
                    <div className={css.additionalContentFiles}></div>
                </div>
            </div>
            <div className={css.resolutionGroup}></div>
        </div>
    </form>
};
