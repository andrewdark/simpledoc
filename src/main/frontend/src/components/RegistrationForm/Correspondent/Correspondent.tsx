import React, {ChangeEvent, FC, useState} from 'react';
import css from "./Correspondent.module.css";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";
import {VscNewFile, VscSaveAs} from "react-icons/vsc";
import {BsFeather, BsFileText, BsTrash} from "react-icons/bs";
import {CorrespondentAutocompleteInput} from "./CorrespondentAutocompleteInput/CorrespondentAutocompleteInput";
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
    const [isNewCorr, setIsNewCorr] = useState<boolean>(true);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [position, setPosition] = useState<number>(0);
    const [outNum, setOutNum] = useState<string>('');
    const [outDate, setOutDate] = useState<Date | null>(null); //Date;
    const [note, setNote] = useState<string>('');
    const [signatory, setSignatory] = useState<string>('');
    const [organization, setOrganization] = useState<IOrganization | null>(null);
    const [citizen, setCitizen] = useState<ICitizen | null>(null);

    const AddNewCorrespondent = () => {
        setIsNewCorr(true);
        setOutNum('');
        setOutDate(null); //Date;
        setNote('');
        setSignatory('');
        setOrganization(null);
        setCitizen(null);
        setDisabled(false);
    }

    const EditCorrespondent = () => {
        setDisabled(false);
    }

    const RemoveCorrespondent = () => {
        const isConfirmed = window.confirm(`Видалити поточного кореспондента?`);
        let id: number = 0;
        if (CorrespondentType.INCOMING_ORGANIZATION === correspondentType && organization) {
            id = organization.id ?? 0;
        }
        if (CorrespondentType.INCOMING_CITIZEN === correspondentType && citizen) {
            id = citizen.id ?? 0;
        }
        if (isConfirmed) {
            const newCorrArr = correspondents.filter(cor => cor.organization?.id !== id);
            setCorrespondents(newCorrArr);
            const curCorrespondent: ICorrespondent = newCorrArr[0];

            if (curCorrespondent) {
                setOutNum(curCorrespondent.outNum ?? '');
                setOutDate(curCorrespondent.outDate ?? null);
                setNote(curCorrespondent.note ?? '');
                setSignatory(curCorrespondent.signatory ?? '');
                setOrganization(curCorrespondent.organization ?? null);
                setCitizen(curCorrespondent.citizen ?? null);
                setPosition(1);
                setDisabled(true);
            } else {
                setIsNewCorr(true);
                setOutNum('');
                setOutDate(null); //Date;
                setNote('');
                setSignatory('');
                setOrganization(null);
                setCitizen(null);
                setPosition(0);
                setDisabled(false);
            }
        }

    }

    const SaveCorrespondent = () => {
        if (isNewCorr) {
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
            if (organization || citizen) {
                setCorrespondents([...correspondents, newCorrespondent])
                setIsNewCorr(false);
                const newPosition = position + 1;
                setPosition(newPosition);
            }
        } else {
            const curCorrespondent: ICorrespondent = correspondents[position - 1];

            if (curCorrespondent) {
                curCorrespondent.outNum = outNum;
                curCorrespondent.outDate = outDate;
                curCorrespondent.note = note;
                curCorrespondent.signatory = signatory;
                curCorrespondent.organization = organization;
                curCorrespondent.citizen = citizen;
            }
        }
        setDisabled(true);

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

    const navLeftBtn = () => {

        if (position > 1) {
            const newPosition = position - 1;
            setPosition(newPosition);
            setDisabled(true);
            const curCorrespondent: ICorrespondent = correspondents[newPosition - 1];
            if (curCorrespondent) {
                setOutNum(curCorrespondent.outNum ?? '');
                setOutDate(curCorrespondent.outDate ?? null); //Date;
                setNote(curCorrespondent.note ?? '');
                setSignatory(curCorrespondent.signatory ?? '');
                setOrganization(curCorrespondent.organization ?? null);
                setCitizen(curCorrespondent.citizen ?? null);
            }

        }

    };

    const navRightBtn = () => {
        const maxPosition = correspondents.length;

        if (position < maxPosition) {
            setDisabled(true);
            const newPosition = position + 1;
            setPosition(newPosition);

            const curCorrespondent: ICorrespondent = correspondents[newPosition - 1];

            if (curCorrespondent) {
                setOutNum(curCorrespondent.outNum ?? '');
                setOutDate(curCorrespondent.outDate ?? null); //Date;
                setNote(curCorrespondent.note ?? '');
                setSignatory(curCorrespondent.signatory ?? '');
                setOrganization(curCorrespondent.organization ?? null);
                setCitizen(curCorrespondent.citizen ?? null);
            }
        }

    };

    return (
        <div className={css.incomingCorrespondent}>
            <div className={css.correspondentHeader}>
                <h5>Кореспонденти ({position} з {correspondents.length})</h5>
                <div className={css.correspondentNavigation}>
                    <div className={css.iterationButton}>
                        <button type="button" onClick={navLeftBtn}>
                            <FiChevronLeft size={16}/>
                        </button>
                        <button type="button" onClick={navRightBtn}>
                            <FiChevronRight/>
                        </button>
                    </div>
                    <div>
                        <button type="button" onClick={AddNewCorrespondent}><VscNewFile/>
                        </button>
                        <button type="button" onClick={SaveCorrespondent}><VscSaveAs/></button>
                        <button type="button" onClick={() => {

                        }}><BsFileText/></button>

                        <button type="button" onClick={EditCorrespondent}><BsFeather/></button>
                        <button type="button" onClick={RemoveCorrespondent}><BsTrash/></button>
                    </div>

                </div>
            </div>
            {CorrespondentType.INCOMING_ORGANIZATION === correspondentType &&
                <div className={css.correspondentBody}>
                    <div className={css.formField}>
                        <label>Коресп: </label>
                        <div>
                            <CorrespondentAutocompleteInput correspondentType={CorrespondentType.INCOMING_ORGANIZATION}
                                                            organization={organization}
                                                            setOrganization={setOrganization}
                                                            citizen={citizen} setCitizen={setCitizen} disabled={disabled}/>

                        </div>
                    </div>
                    <div className={css.incomingOrgDetails}>
                        <div className={css.formField}>
                            <label>Вих №: </label>
                            <input value={outNum} onChange={handleOutNumChange} disabled={disabled}/>
                        </div>
                        <div className={css.formField}>
                            <label>Дата: </label>
                            <DatePicker
                                className={css.datePickerField}
                                locale={uk}
                                selected={outDate} // Текущая выбранная дата
                                onChange={(date) => setOutDate(date)} // Функция для обновления состояния
                                dateFormat="yyyy-MM-dd" // Формат отображения даты
                                disabled={disabled}
                            />
                        </div>
                        <div className={css.formField}>
                            <label>Підпис: </label>
                            <input value={signatory} onChange={handleSignatoryChange} disabled={disabled}/>
                        </div>
                    </div>

                    <div className={css.formField}>
                        <label>Прим: </label>
                        <input value={note} onChange={handleNoteChange} disabled={disabled}/>
                    </div>
                </div>
            }
            {CorrespondentType.INCOMING_CITIZEN === correspondentType &&
                <div className={css.correspondentBody}>
                    <div className={css.formField}>
                        <label>Громад: </label>
                        <div>
                            <CorrespondentAutocompleteInput correspondentType={CorrespondentType.INCOMING_CITIZEN}
                                                            organization={organization}
                                                            setOrganization={setOrganization}
                                                            citizen={citizen} setCitizen={setCitizen} disabled={disabled}/>

                        </div>
                    </div>
                    <div className={css.incomingOrgDetails}>
                        <div className={css.formField}>
                            <label>Адреса: </label>
                            <input value={citizen?.address ?? ''} disabled={true}/>
                        </div>
                    </div>
                </div>
            }

        </div>
    );
};
