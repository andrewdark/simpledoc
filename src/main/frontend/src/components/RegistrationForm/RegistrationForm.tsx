import React, {ChangeEvent, FC, FormEvent, useEffect, useState} from 'react';
import {IRecord} from "../../models/IRecord";
import css from "./RegistrationForm.module.css";
import {IRecordGroup, RecordGroupType} from "../../models/catalog/IRecordGroup";
import {CorrespondentType, ICorrespondent} from "../../models/ICorrespondent";
import {IDelivery} from "../../models/catalog/IDelivery";
import {IResolution} from "../../models/IResolution";
import {IFileLink} from "../../models/IFileLink";
import {IRubric} from "../../models/catalog/IRubric";
import {VscAttach, VscNewFile, VscSaveAs} from "react-icons/vsc";
import {parseStringToNumberOrDefaultZero} from "../../utils/parser";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {BsFiletypePdf, BsTrash} from "react-icons/bs";
import {getAllDelivery} from "../../redux/catalog/delivery/operations";
import {FileUpload} from "../FileUpload/FileUpload";
import {clearOrganizations} from "../../redux/catalog/organization/slice";
import {clearCitizens} from "../../redux/catalog/citizen/slice";
import {Correspondent} from "./Correspondent/Correspondent";
import {Resolution} from "./Resolution/Resolution";
import AppInput from "../../UI/AppInput/AppInput";
import * as yup from 'yup';
import {FormErrorMap} from "../../models/AppTypes";
import AppTextArea from "../../UI/AppTextArea/AppTextArea";
import AppDatePicker from "../../UI/AppDatePicker/AppDatePicker";
import AppDocNumber from "../../UI/AppDocNumber/AppDocNumber";
import Publisher from "./Publisher/Publisher";
import {IPublisher} from "../../models/IPublisher";


interface RegistrationFormProps {
    dto?: IRecord;
    formHandler: (registration: IRecord, fileList: File[]) => void;
}

const validationSchema = yup.object({
    recipient: yup.string().required("Обов\'язкове поле"),
    regDate: yup.date().required("Обов\'язкове поле"),
    orderNum: yup.number().moreThan(0).required("Обов\'язкове поле"),
    content: yup.string().required("Обов\'язкове поле"),
});

export const RegistrationForm: FC<RegistrationFormProps> = ({dto, formHandler}) => {
    const recordGroupInit: IRecordGroup | null = useAppSelector(state => state.recordGroupReducer.item);
    const deliveries: IDelivery[] = useAppSelector(state => state.deliveryReducer.items);
    const dispatch = useAppDispatch();

    const [errorObject, setErrorObject] = useState<FormErrorMap>({});
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
    const [publishers, setPublishers] = useState<IPublisher[]>([]);

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

    function getErrorObject(dto: IRecord) {
        try {
            validationSchema.validateSync(dto, {abortEarly: false});
            return {}; // Немає помилок
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                // 🎯 Перетворення внутрішнього масиву помилок (inner) в об'єкт
                const errorObject: FormErrorMap = {};

                err.inner.forEach(e => {
                    // Уникаємо повторних ключів
                    if (e.path && !errorObject[e.path]) {
                        errorObject[e.path] = e.message;
                    }
                });

                return errorObject;
                /* Поверне:
                  {
                    name: "Ім'я повинно містити не менше 5 символів",
                    age: "Ви повинні бути повнолітніми",
                    email: "Email є обов'язковим"
                  }
                */
            }
            return {};
        }
    }

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
        const errors = getErrorObject(dto);
        setErrorObject(errors);
        // Здесь можно отправить данные на сервер
        if (Object.keys(errors).length === 0 && dto.recordGroup) {
            formHandler(dto, fileList);
        } else {
            alert("Реєстраційна картка має помилки");
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

                <div className={css.regInfoGroupItem}>
                    <AppDocNumber errorObject={errorObject} inputLabel={'№:'} regNum={regNum} orderNum={orderNum}
                                  handleRegNumChange={handleRegNumChange} handleOrderNumChange={handleOrderNumChange}
                                  delimiter={'/'} reverse={true} disabled={false}/>
                </div>
                <div className={css.regInfoGroupItem}>
                    <AppDatePicker inputLabel={"Від:"} value={regDate} onChange={(date) => setRegDate(date)}
                                   errorMessage={errorObject.regDate}/>
                </div>
            </div>
            <div className={css.bodyContentGroup}>
                <div className={css.mainContentGroup}>
                    <div className={css.mainContentCorrespondents}>

                        {(RecordGroupType.OUTGOING === recordGroupInit?.recordGroupType) &&
                            <Publisher publishers={publishers} setPublishers={setPublishers}
                                       recordGroupType={RecordGroupType.OUTGOING}>
                                <AppTextArea inputLabel={"Зміст:"} value={content} onChange={handleContentChange}
                                             errorMessage={errorObject.content}/>
                            </Publisher>
                        }
                        {(RecordGroupType.INNER === recordGroupInit?.recordGroupType) &&
                            <Publisher publishers={publishers} setPublishers={setPublishers}
                                       recordGroupType={RecordGroupType.INNER}>
                                <AppTextArea inputLabel={"Зміст:"} value={content} onChange={handleContentChange}
                                             errorMessage={errorObject.content}/>
                            </Publisher>
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
                        <AppInput inputType={"text"} inputLabel={"Кому:"} value={recipient}
                                  onChange={handleRecipientChange} errorMessage={errorObject.recipient}/>
                        {(RecordGroupType.INCOMING === recordGroupInit?.recordGroupType || RecordGroupType.CITIZEN === recordGroupInit?.recordGroupType) &&
                            <AppTextArea inputLabel={"Зміст:"} value={content} onChange={handleContentChange}
                                         errorMessage={errorObject.content}/>}
                        <AppInput inputType={"text"} inputLabel={"Прим:"} value={note} onChange={handleNoteChange}
                                  errorMessage={errorObject.note}/>
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
