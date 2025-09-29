import React, {ChangeEvent, FC, FormEvent, useEffect, useState} from 'react';
import {IRecord} from "../../models/IRecord";
import css from "./RegistrationForm.module.css";
import DatePicker from 'react-datepicker';
import {IRecordGroup, RecordGroupType} from "../../models/catalog/IRecordGroup";
import {CorrespondentType, ICorrespondent} from "../../models/ICorrespondent";
import {IDelivery} from "../../models/catalog/IDelivery";
import {IResolution} from "../../models/IResolution";
import {IFileLink} from "../../models/IFileLink";
import {IRubric} from "../../models/catalog/IRubric";
import {VscAttach, VscNewFile, VscSaveAs} from "react-icons/vsc";
import {uk} from "date-fns/locale";
import {parseStringToNumberOrDefaultZero} from "../../utils/parser";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {BsFeather, BsFileText, BsFiletypePdf, BsTrash} from "react-icons/bs";
import {getAllDelivery} from "../../redux/catalog/delivery/operations";
import {FileUpload} from "../FileUpload/FileUpload";
import {clearOrganizations} from "../../redux/catalog/organization/slice";
import {clearCitizens} from "../../redux/catalog/citizen/slice";
import {Correspondent} from "./Correspondent/Correspondent";
import {Resolution} from "./Resolution/Resolution";
import AppInput from "../../UI/AppInput/AppInput";


interface RegistrationFormProps {
    dto?: IRecord;
    formHandler: (registration: IRecord, fileList: File[]) => void;
}

export const RegistrationForm: FC<RegistrationFormProps> = ({dto, formHandler}) => {
    const recordGroupInit: IRecordGroup | null = useAppSelector(state => state.recordGroupReducer.item);
    const deliveries: IDelivery[] = useAppSelector(state => state.deliveryReducer.items);
    const dispatch = useAppDispatch();

    const [id, setId] = useState<number | null>(null);
    const [orderNum, setOrderNum] = useState<number>(0);
    const [regNum, setRegNum] = useState<string>('');
    const [regDate, setRegDate] = useState<Date | null>(null); //Date;
    const [consist, setConsist] = useState<string>('');
    const [recipient, setRecipient] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [note, setNote] = useState<string>('');
    const [collective, setCollective] = useState<boolean>(false);
    const [signCount, setSignCount] = useState<number>(0);

    // const [recordGroup, setRecordGroup] = useState<IRecordGroup | null>(null); //IRecordGroup | null;
    const [correspondents, setCorrespondents] = useState<ICorrespondent[]>([]); //ICorrespondent[];

    const [delivery, setDelivery] = useState<IDelivery | null>(null); //IDelivery;
    const [resolutions, setResolutions] = useState<IResolution[] | null>(null); //IResolution[];
    const [files, setFiles] = useState<IFileLink[]>([]); //IFileLink[];
    const [fileList, setFileList] = useState<File[]>([]);
    const [rubrics, setRubrics] = useState<IRubric[] | null>(null); //IRubric[];

    useEffect(() => {
        if (recordGroupInit) {
            setRegNum(recordGroupInit.indexNum);
        } else {

        }
        dispatch(clearOrganizations());
        dispatch(clearCitizens());
        dispatch(getAllDelivery({size: 100, number: 0}));
    }, [dispatch]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Предотвращаем перезагрузку страницы
        const dto: IRecord = {
            id: id,
            orderNum: orderNum,
            regNum: regNum,
            regDate: regDate,
            consist: consist,
            recipient: recipient,
            content: content,
            note: note,
            collective: collective,
            signCount: signCount,
            recordGroup: recordGroupInit,
            correspondents: correspondents,
            delivery: delivery,
            resolutions: resolutions,
            files: files,
            rubrics: rubrics,
        }
        // Здесь можно отправить данные на сервер
        if (dto.recordGroup) {
            console.log("FORM-DATA: ", {dto});
            console.log("FILE-LIST: ", fileList);
            formHandler(dto, fileList);

        } else {
            alert("RecordGroup is missing");
        }

    };
    const handleRegNumChange = (event: ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        setRegNum(val);
    };
    const handleOrderNumChange = (event: ChangeEvent<HTMLInputElement>) => {
        const val = parseStringToNumberOrDefaultZero(event.target.value);
        setOrderNum(val);
    };
    const handleRecipientChange = (event: ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        setRecipient(val);
    };
    const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const val = event.target.value;
        setContent(val);
    };
    const handleNoteChange = (event: ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        setNote(val);
    };
    const handleConsistChange = (event: ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        setConsist(val);
    };
    const handleDeliverySelect = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = parseStringToNumberOrDefaultZero(event.target.value);
        const val = deliveries.find(el => el.id === value);
        if (val) {
            setDelivery(val);
        }
    };

    const handleFilesSelect = (selectedFile: File) => {
        //TODO: For example
        if (files.map(el => el.id).find(el => el == selectedFile.lastModified)) {
            console.log("File Exist");
        } else {
            const someFile: IFileLink = {id: selectedFile.lastModified, fileName: selectedFile.name}
            setFileList([...fileList, selectedFile]);
            setFiles([...files, someFile]);
        }

    }
    const handleFilesRemove = (filename: string) => {
        const fLink: IFileLink[] = files.filter(el => el.fileName !== filename);
        setFiles(fLink);

        const fList: File[] = fileList.filter(el => el.name !== filename);
        setFileList(fList);
    }

    return <form className={css.registrationForm} onSubmit={handleSubmit}>
        <div className={css.registrationFormContainer}>
            <div className={css.navigationBarGroup}>
                <button type="button" className={css.someButton}>
                    <VscNewFile size={24}/>
                </button>

                <button type="submit" className={css.submitButton}>
                    <VscSaveAs size={24}/>
                </button>
            </div>
            <div className={css.regInfoGroup}>
                <div className={css.formField}>
                    <label>№:</label>
                    <div className={css.numberOfDocGroup}>
                        <input type="text" className={`${css.singleInputForNumber} ${css.regNumInput}`} value={regNum}
                               onChange={handleRegNumChange}/>
                        <input type="text" className={`${css.singleInputForNumber} ${css.regDelimiterInput}`}
                               value="/"/>
                        <input type="text" className={`${css.singleInputForNumber} ${css.orderNumInput}`}
                               value={orderNum}
                               onChange={handleOrderNumChange}/>
                    </div>
                </div>
                <div className={css.formField}>
                    <label>Від:</label>
                    <DatePicker
                        className={css.datePickerField}
                        locale={uk}
                        selected={regDate} // Текущая выбранная дата
                        onChange={(date) => setRegDate(date)} // Функция для обновления состояния
                        dateFormat="yyyy-MM-dd" // Формат отображения даты
                    />
                </div>

            </div>
            <div className={css.bodyContentGroup}>
                <div className={css.mainContentGroup}>
                    <div className={css.mainContentCorrespondents}>

                        {(RecordGroupType.OUTGOING === recordGroupInit?.recordGroupType) &&
                            <div className={css.outgoingCorrespondent}>
                                <h5>Підписанти</h5>
                                <div className={css.formField}>
                                    <label>Виконавець: </label>
                                    <input/>
                                </div>
                            </div>

                        }
                        {(RecordGroupType.INNER === recordGroupInit?.recordGroupType) &&
                            <div className={css.outgoingCorrespondent}>
                                <h5>Підписанти</h5>
                                <div className={css.formField}>
                                    <label>Виконавець: </label>
                                    <input/>
                                </div>
                            </div>
                        }

                        {(RecordGroupType.INCOMING === recordGroupInit?.recordGroupType) &&
                            <Correspondent correspondents={correspondents} setCorrespondents={setCorrespondents}
                                           correspondentType={CorrespondentType.INCOMING_ORGANIZATION}/>
                        }
                        {(RecordGroupType.CITIZEN === recordGroupInit?.recordGroupType) &&
                            <Correspondent correspondents={correspondents} setCorrespondents={setCorrespondents}
                                           correspondentType={CorrespondentType.INCOMING_CITIZEN}/>
                        }
                    </div>
                    <div className={css.mainContentAttributes}>
                        {/*<div className={css.formField}>*/}
                        {/*    <label>Кому: </label>*/}
                        {/*    <input value={recipient} onChange={handleRecipientChange}/>*/}
                        {/*</div>*/}
                        <AppInput inputType={"text"} inputLabel={"Кому:"} value={recipient}
                                  onChange={handleRecipientChange} errorMessage={"Обов'язкове поле"} valid={true}
                                  touched={true} shouldValidate={true}/>
                        <div className={css.formField}>
                            <label>Зміст: </label>
                            <textarea value={content} onChange={handleContentChange}/>
                        </div>
                        <div className={css.formField}>
                            <label>Прим: </label>
                            <input value={note} onChange={handleNoteChange}/>
                        </div>
                    </div>
                </div>
                <div className={css.additionalContentGroup}>
                    <div className={css.additionalContentAttributes}>
                        <div className={css.formField}>
                            <label>Склад: </label>
                            <input value={consist} onChange={handleConsistChange}/>
                        </div>

                        <div className={css.formField}>
                            <label>Дост: </label>
                            <select onChange={handleDeliverySelect}>
                                <option value="">-- Спосіб доставки--</option>
                                {deliveries.filter(el => el.id).map(el => <option key={el.id}
                                                                                  value={el.id ?? 0}>{el.name}</option>)}
                            </select>
                        </div>

                    </div>
                    <div className={css.additionalContentFiles}>
                        <div className={css.fileHeader}>
                            <h5>Файли ({files.length})</h5>
                            <div className={css.navigationBar}>
                                <FileUpload setFile={handleFilesSelect} accept={'.doc,.docx,.xls,.xlsx,.pdf,image/*'}>
                                    <button type="button">
                                        <VscAttach size={16}/>
                                    </button>
                                </FileUpload>

                            </div>
                        </div>

                        <div className={css.fileList}>
                            {files.map(el => (
                                <div className={css.fileItem} key={el.id}>
                                    <div><BsFiletypePdf/></div>
                                    <div className={css.fileName}>
                                        <strong>{el.fileName}</strong>
                                    </div>
                                    <div className={css.fileAction} onClick={() => handleFilesRemove(el.fileName)}>
                                        <BsTrash/></div>
                                </div>))
                            }
                        </div>
                    </div>
                </div>

            </div>
            <div className={css.resolutionGroup}>
                <Resolution/>
            </div>
        </div>
    </form>
};
