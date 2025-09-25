import React, {ChangeEvent, FC, useState} from 'react';
import css from "./Correspondent.module.css";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";
import {VscNewFile, VscSaveAs} from "react-icons/vsc";
import {BsFeather, BsFileText, BsTrash} from "react-icons/bs";
import {AutocompleteInput} from "../../AutocompleteInput/AutocompleteInput";
import {RecordGroupType} from "../../../models/catalog/IRecordGroup";
import DatePicker from "react-datepicker";
import {uk} from "date-fns/locale";
import {CorrespondentType, ICorrespondent} from "../../../models/ICorrespondent";
import {IOrganization} from "../../../models/catalog/IOrganization";
import {ICitizen} from "../../../models/catalog/ICitizen";

interface CorrespondentProps {
    correspondents: ICorrespondent[];
    setCorrespondents: (setCorrespondents: ICorrespondent[]) => void;
    correspondentType: typeof CorrespondentType[keyof typeof CorrespondentType];
}

export const Correspondent: FC<CorrespondentProps> = ({correspondents, setCorrespondents, correspondentType}) => {

    const [outNum, setOutNum] = useState<string>('');
    const [outDate, setOutDate] = useState<Date | null>(null); //Date;
    const [note, setNote] = useState<string>('');
    const [signatory, setSignatory] = useState<string>('');
    const [organization, setOrganization] = useState<IOrganization | null>(null);
    const [citizen, setCitizen] = useState<ICitizen | null>(null);

    const AddNewCorrespondent = () => {
        const newCorrespondent: ICorrespondent = {
            id: null,
            outNum: outNum,
            outDate: outDate,
            note: note,
            signatory: signatory,
            organization: organization,
            citizen: citizen,
            correspondentType: correspondentType
        }
        if(organization || citizen){
            setCorrespondents([...correspondents, newCorrespondent])
        }

    };
    const handleOutNumChange = (event: ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        setOutNum(val);
    };
    const handleNoteChange = (event: ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        setNote(val);
    };
    const handleSignatoryChange = (event: ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        setSignatory(val);
    };

    return (
        <div className={css.incomingCorrespondent}>
            <div className={css.correspondentHeader}>
                <h5>Кореспонденти ({correspondents.length})</h5>
                <div className={css.correspondentNavigation}>

                    <div onClick={() => {

                    }}>
                        <FiChevronLeft/>
                    </div>
                    <div onClick={() => {

                    }}>
                        <FiChevronRight/>
                    </div>
                    <div onClick={() => {

                    }}><VscNewFile/>
                    </div>
                    <div onClick={AddNewCorrespondent}><VscSaveAs/></div>
                    <div onClick={() => {

                    }}><BsFileText/></div>

                    <div onClick={() => {

                    }}><BsFeather/></div>
                    <div onClick={() => {
                    }}><BsTrash/></div>
                </div>
            </div>
<div className={css.correspondentBody}>
    <div className={css.formField}>
        <label>Коресп: </label>
        <div>
            <AutocompleteInput recordGroupType={RecordGroupType.INCOMING} setOrganization={setOrganization} setCitizen={setCitizen}/>

        </div>
    </div>
    <div className={css.incomingOrgDetails}>
        <div className={css.formField}>
            <label>Вих №: </label>
            <input value={outNum} onChange={handleOutNumChange}/>
        </div>
        <div className={css.formField}>
            <label>Дата: </label>
            <DatePicker
                className={css.datePickerField}
                locale={uk}
                selected={outDate} // Текущая выбранная дата
                onChange={(date) => setOutDate(date)} // Функция для обновления состояния
                dateFormat="yyyy-MM-dd" // Формат отображения даты
            />
        </div>
        <div className={css.formField}>
            <label>Підпис: </label>
            <input value={signatory} onChange={handleSignatoryChange}/>
        </div>
    </div>

    <div className={css.formField}>
        <label>Прим: </label>
        <input value={note} onChange={handleNoteChange}/>
    </div>
</div>

        </div>
    );
};
