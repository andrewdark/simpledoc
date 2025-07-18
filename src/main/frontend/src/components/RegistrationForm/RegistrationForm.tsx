import React, {FC, useEffect, useMemo, useState} from 'react';
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik, FormikConsumer, useFormikContext} from "formik";
import css from "./RegistrationForm.module.css";
import {IRecordGroup, RecordGroupType} from "../../models/catalog/IRecordGroup";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {DatePickerField} from "../DatePickerField/DatePickerField";
import {CorrespondentType, ICorrespondent} from "../../models/ICorrespondent";
import {AppSelect} from "../../UI/AppSelect/AppSelect";
import {setModal} from "../../redux/modal/slice";
import ModalFormContainer from "../../hoc/ModalFormContainer/ModalFormContainer";
import {CorrespondentForm} from "../correspondent/CorrespondentForm/CorrespondentForm";
import {getAllOrganization} from "../../redux/catalog/organization/operations";
import {getAllCitizen} from "../../redux/catalog/citizen/operations";
import {IRecord} from "../../models/IRecord";
import {IDelivery} from "../../models/catalog/IDelivery";
import {getAllDelivery} from "../../redux/catalog/delivery/operations";
import {BsFiletypePdf} from "react-icons/bs";

const validationSchema = Yup.object().shape({
    id: Yup.number().nullable(),
    orderNum: Yup.number().nullable(),
    regNum: Yup.string().nullable(),
    regDate: Yup.date().required("Обов\'язкове поле"),
    content: Yup.string().min(2, "Занадто коротке!").required("Обов\'язкове поле"),
    note: Yup.string().nullable()
});

interface RegistrationFormProps {
    formHandler: (registration: IRecord) => void;
}

interface CorrespondentProps {
    selectedCorespondentType: typeof CorrespondentType.INCOMING_ORGANIZATION | typeof CorrespondentType.INCOMING_CITIZEN;
    setSelectedCorespondentType: (val: typeof CorrespondentType.INCOMING_ORGANIZATION | typeof CorrespondentType.INCOMING_CITIZEN) => void;
}

const CorespondentField: FC<CorrespondentProps> = ({selectedCorespondentType, setSelectedCorespondentType}) => {

    const dispatch = useAppDispatch();
    const {values} = useFormikContext<IRecord>(); // Отримуємо доступ до об'єкта 'values' з Formik
    const shouldShowShadeField = RecordGroupType.INCOMING === values.recordGroup?.recordGroupType;
    if (!shouldShowShadeField) {
        return null;
    }

    const chooseGroupHandler = (val: typeof CorrespondentType.INCOMING_ORGANIZATION | typeof CorrespondentType.INCOMING_CITIZEN) => {
        setSelectedCorespondentType(val);
        if (CorrespondentType.INCOMING_ORGANIZATION === val) {
            dispatch(getAllOrganization({size: 100, number: 0}));
        }
        if (CorrespondentType.INCOMING_CITIZEN === val) {
            dispatch(getAllCitizen({size: 100, number: 0}));
        }
    };
    const correspondentTypeOption = [
        {
            value: CorrespondentType.INCOMING_ORGANIZATION,
            label: "Вхідний від організації"
        },
        {
            value: CorrespondentType.INCOMING_CITIZEN,
            label: "Вхідний від громадян"
        }
    ];

    const rootClasses = [css.selectCorrespondentTypeSelector];
    if (values.correspondents?.length && values.correspondents?.length > 0) {
        rootClasses.push(css.lock);
    }
    return (
        <div className={css.correspondentGroup}>
            <h5>Кореспондент {values.correspondents ? values.correspondents.length : 0}</h5>

            <div className={css.selectCorrespondentType}>

                <div className={rootClasses.join(' ')}>
                    <AppSelect<typeof CorrespondentType.INCOMING_ORGANIZATION | typeof CorrespondentType.INCOMING_CITIZEN>
                        options={correspondentTypeOption} value={selectedCorespondentType}
                        onChange={chooseGroupHandler}/>
                </div>

                <button type="button" onClick={() => {
                    dispatch(setModal(true));
                }}>Додати
                </button>
            </div>

        </div>
    )

};


export const RegistrationForm: FC<RegistrationFormProps> = (props) => {
    const [selectedCorespondentType, setSelectedCorespondentType] = useState<typeof CorrespondentType.INCOMING_ORGANIZATION | typeof CorrespondentType.INCOMING_CITIZEN>(CorrespondentType.INCOMING_ORGANIZATION);
    const recordGroup: IRecordGroup | null = useAppSelector(state => state.recordGroupReducer.item);
    const deliveries: IDelivery[] = useAppSelector(state => state.deliveryReducer.items);
    const itemForUpdate: IRecord | null = null;
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllOrganization({size: 100, number: 0}));
        dispatch(getAllDelivery({size: 100, number: 0}));
    }, [dispatch]);

    const handleSubmit = (values: any, actions: any) => {
        const selectedDelivery = deliveries.find(dlv => dlv.id === values.selectedDeliveryId);
        const payload = {...values, delivery: selectedDelivery};
        //submitForm(payload);
        props.formHandler(payload);
        actions.resetForm();
    };
    const initialValues: IRecord = useMemo<IRecord>(() => ({
        id: null,
        orderNum: 0,
        regNum: recordGroup ? recordGroup.indexNum : "",
        regDate: new Date(),
        content: "",
        note: "",
        recordGroup: recordGroup ?? null,
        correspondents: []
    }), [recordGroup]);

    return (
        <>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}
                    enableReinitialize={true}>

                {({values, setFieldValue}) => {
                    // Саме тут накидуємо кореспондентів у масив
                    const addCorrespondent = (dto: ICorrespondent) => {
                        dispatch(setModal(false));
                        if (values.correspondents) {
                            if (!!dto.citizen || !!dto.organization) {
                                setFieldValue('correspondents', [...values.correspondents, dto]);
                            }
                        }
                    };
                    return (
                        <>
                            <Form className={css.form}>
                                {itemForUpdate && <Field type="hidden" name="id"/>}
                                <Field type="hidden" name="recordGroup"/>
                                <div className={css.regInfoGroup}>
                                    <div className={css.numberOfDocGroup}>
                                        <div className={css.fieldsGroup}>
                                            <label htmlFor="orderNum">№:</label>
                                            <Field className={css.fInput} id="orderNum" type="text" name="orderNum"
                                                   placeholder="orderNum"/>
                                            <ErrorMessage className={css.error} name="orderNum" component="span"/>
                                        </div>
                                        <div className={css.fieldsGroup}>
                                            <label htmlFor="regNum">/</label>
                                            <Field className={css.fInput} type="text" id="regNum" name="regNum"
                                                   placeholder="regNum"/>
                                            <ErrorMessage className={css.error} name="regNum" component="span"/>
                                        </div>
                                    </div>

                                    <div className={css.fieldsGroup}>
                                        <label htmlFor="regDate">Від:</label>
                                        <Field className={css.fInput} component={DatePickerField} id="regDate"
                                               name="regDate"
                                               placeholder="regDate"/>
                                        <ErrorMessage className={css.error} name="regDate" component="span"/>
                                    </div>
                                </div>
                                <div className={css.bodyContentGroup}>
                                    <div className={css.mainContentGroup}>
                                        <CorespondentField selectedCorespondentType={selectedCorespondentType}
                                                           setSelectedCorespondentType={setSelectedCorespondentType}/>
                                        <div className={css.fieldsGroup}>
                                            <label htmlFor="content">Зміст:</label>
                                            <Field className={css.fContent} id="content" type="text" name="content"
                                                   placeholder="Зміст"/>
                                            <ErrorMessage className={css.error} name="content" component="span"/>
                                        </div>
                                        <div className={css.fieldsGroup}>
                                            <label htmlFor="note">Примітка:</label>
                                            <Field className={css.fNoteInput} id="note" type="text" name="note"
                                                   placeholder="Примітка"/>
                                            <ErrorMessage className={css.error} name="note" component="span"/>
                                        </div>
                                    </div>
                                    <div className={css.additionalAttributeGroup}>
                                        <div className={css.additionalAttributeContent}>
                                            <div className={css.fieldsGroup}>
                                                <label htmlFor="consist">Склад:</label>
                                                <Field className={css.fInput} id="consist" type="text" name="consist"
                                                       placeholder=""/>
                                                <ErrorMessage className={css.error} name="consist" component="span"/>
                                            </div>
                                            <div className={css.fieldsGroup}>
                                                <label htmlFor="selectedDeliveryId">Доставка:</label>
                                                <Field as="select" id="selectedDeliveryId" name="selectedDeliveryId" className={css.appSelectComponent}>
                                                    <option value="">-- Спосіб доставки--</option>
                                                    {deliveries.filter(el => el.id).map(el => <option key={el.id}
                                                                                                      value={el.id ?? 0}>{el.name}</option>)}
                                                </Field>
                                                <ErrorMessage className={css.error} name="delivery" component="span"/>
                                            </div>
                                        </div>

                                        <div className={css.filesGroup}>
                                            <h5>Файли</h5>
                                            <div className={css.filesContent}>
                                                <BsFiletypePdf /> <strong> - Request.pdf</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className={css.submitBtn} type="submit">Зберегти</button>
                            </Form>
                            <ModalFormContainer>
                                <CorrespondentForm formHandler={addCorrespondent}
                                                   correspondentType={selectedCorespondentType}/>
                            </ModalFormContainer>
                        </>
                    );
                }}
            </Formik>
        </>

    );
};
