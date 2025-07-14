import React, {FC} from 'react';
import * as Yup from "yup";
import {IRegistration} from "../../models/IRegistration";
import {ErrorMessage, Field, Form, Formik, useFormikContext} from "formik";
import css from "./RegistrationForm.module.css";
import {IRecordGroup, RecordGroupType} from "../../models/catalog/IRecordGroup";
import {useAppSelector} from "../../hooks/redux";
import {DatePickerField} from "../DatePickerField/DatePickerField";
import {IDepartment} from "../../models/catalog/IDepartment";
import {CorrespondentType, ICorrespondent} from "../../models/ICorrespondent";

const validationSchema = Yup.object().shape({
    id: Yup.number().nullable(),
    orderNum: Yup.number().nullable(),
    regNum: Yup.string().nullable(),
    regDate: Yup.date().nullable(),
    content: Yup.string().min(2, "Занадто коротка!").required("Обов\'язкове поле"),
    note: Yup.string().nullable()
});

interface RegistrationFormProps {
    formHandler: (registration: IRegistration) => void;
}

const CorespondentField = () => {
    const {values} = useFormikContext<IRegistration>(); // Отримуємо доступ до об'єкта 'values' з Formik

    const shouldShowShadeField = RecordGroupType.INCOMING === values.recordGroup?.recordGroupType;

    if (!shouldShowShadeField) {
        return null;
    }

    return (
        <div className={css.correspondentGroup}>
            <h5>Кореспондент</h5>

            <div className={css.fieldsGroup}>
                <label htmlFor="correspondent.correspondentType">Тип кореспондента:</label>
                <Field as="select" id="correspondent.correspondentType" name="correspondent.correspondentType">
                    <option
                        value={CorrespondentType.INCOMING_ORGANIZATION}>{CorrespondentType.INCOMING_ORGANIZATION.valueOf()}</option>
                    <option
                        value={CorrespondentType.INCOMING_CITIZEN}>{CorrespondentType.INCOMING_CITIZEN.valueOf()}</option>
                </Field>
                <ErrorMessage name="correspondent.correspondentType" component="div" className={css.error}/>
            </div>
            {CorrespondentType.INCOMING_ORGANIZATION === values.correspondent?.correspondentType ?
                <>
                <div className={css.fieldsGroup}>
                    <label htmlFor="org">Організація:</label>
                    <input value="Вибираємо організацію" id="org"/>
                </div>

                    <div className={css.fieldsGroup}>
                        <label htmlFor="correspondent.note">Примітка:</label>
                        <Field className={css.fInput} type="text" id="correspondent.note" name="correspondent.note"
                               placeholder="note"/>
                        <ErrorMessage className={css.error} name="correspondent.note" component="span"/>
                    </div>
                </>
                :
                <>
                    <label htmlFor="cit">Громадянин:</label>
                    <input value="Вибираємо громадянина" id="cit"/>
                </>
            }

        </div>
    )

};


export const RegistrationForm: FC<RegistrationFormProps> = (props) => {
    const recordGroup: IRecordGroup | null = useAppSelector(state => state.recordGroupReducer.item);
    const itemForUpdate: IRegistration | null = null;

    const handleSubmit = (values: any, actions: any) => {
        props.formHandler(values);
        actions.resetForm();
    };
    const initialValues: IRegistration = {
        id: null,
        orderNum: 0,
        regNum: recordGroup ? recordGroup.indexNum : "",
        regDate: new Date(),
        content: "",
        note: "",
        recordGroup: recordGroup ?? null,
        correspondent: {
            id: null,
            note: "",
            correspondentType: CorrespondentType.INCOMING_CITIZEN
        }
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}
                enableReinitialize={true}>
            <Form className={css.form}>
                {itemForUpdate && <Field type="hidden" name="id"/>}
                <Field type="hidden" name="recordGroup"/>
                <div className={css.regInfoGroup}>
                    <div className={css.numberOfDocGroup}>
                        <div className={css.fieldsGroup}>
                            <label htmlFor="orderNum">№:</label>
                            <Field className={css.fInput} id="orderNum" type="text" name="orderNum" placeholder="orderNum"/>
                            <ErrorMessage className={css.error} name="orderNum" component="span"/>
                        </div>
                        <div className={css.fieldsGroup}>
                            <label htmlFor="regNum">/</label>
                            <Field className={css.fInput} type="text" id="regNum" name="regNum" placeholder="regNum"/>
                            <ErrorMessage className={css.error} name="regNum" component="span"/>
                        </div>
                    </div>

                    <div className={css.fieldsGroup}>
                        <label htmlFor="regDate">Від:</label>
                        <Field className={css.fInput} component={DatePickerField} id="regDate" name="regDate"
                               placeholder="regDate"/>
                        <ErrorMessage className={css.error} name="regDate" component="span"/>
                    </div>
                </div>
                <div className={css.bodyContentGroup}>
                    <div className={css.mainContentGroup}>
                        <CorespondentField/>
                        <div className={css.fieldsGroup}>
                            <label htmlFor="content">Зміст:</label>
                            <Field className={css.fContent} id="content" type="text" name="content"
                                   placeholder="Зміст"/>
                            <ErrorMessage className={css.error} name="content" component="span"/>
                        </div>
                        <div className={css.fieldsGroup}>
                            <label htmlFor="note">Примітка:</label>
                            <Field className={css.fNoteInput} id="note" type="text" name="note" placeholder="Примітка"/>
                            <ErrorMessage className={css.error} name="note" component="span"/>
                        </div>
                    </div>
                    <div className={css.additionalAttributeGroup}>
                        <div className={css.additionalAttributeContent}>
                            <div className={css.fieldsGroup}>
                                <label htmlFor="consist">Склад:</label>
                                <Field className={css.fInput} id="consist" type="text" name="consist" placeholder=""/>
                                <ErrorMessage className={css.error} name="consist" component="span"/>
                            </div>
                            <div className={css.fieldsGroup}>
                                <label htmlFor="delivery">Доставка:</label>
                                <Field className={css.fInput} id="delivery" type="text" name="delivery" placeholder=""/>
                                <ErrorMessage className={css.error} name="delivery" component="span"/>
                            </div>
                        </div>

                        <div className={css.filesContent}>
                            <h5>Файли</h5>
                        </div>
                    </div>
                </div>
                <button className={css.submitBtn} type="submit">Зберегти</button>
            </Form>
        </Formik>
    );
};
