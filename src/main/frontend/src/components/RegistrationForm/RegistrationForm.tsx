import React, {FC} from 'react';
import * as Yup from "yup";
import {IRegistration} from "../../models/IRegistration";
import {ErrorMessage, Field, Form, Formik} from "formik";
import css from "./RegistrationForm.module.css";
import {IRecordGroup} from "../../models/catalog/IRecordGroup";
import {useAppSelector} from "../../hooks/redux";
import {DatePickerField} from "../DatePickerField/DatePickerField";

const validationSchema = Yup.object().shape({
    id: Yup.number().nullable(),
    orderNum: Yup.number().nullable(),
    regNum: Yup.string().nullable(),
    regDate: Yup.date().nullable(),
    content: Yup.string().min(2, "Занадто коротка!").required("Обов\'язкове поле"),
});

interface RegistrationFormProps {
    formHandler: (registration: IRegistration) => void;
}

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
        recordGroup: null
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}
                enableReinitialize={true}>
            <Form className={css.form}>
                {itemForUpdate && <Field type="hidden" name="id"/>}
                <Field type="hidden" name="recordGroup"/>
                <div className={css.regInfoGroup}>
                    <div className={css.fieldsGroup}>
                        <label htmlFor="orderNum">orderNum:</label>
                        <Field className={css.fInput} id="orderNum" type="text" name="orderNum" placeholder="orderNum"/>
                        <ErrorMessage className={css.error} name="orderNum" component="span"/>
                    </div>
                    <div className={css.fieldsGroup}>
                        <label htmlFor="regNum">/</label>
                        <Field className={css.fInput} type="text" id="regNum" name="regNum" placeholder="regNum"/>
                        <ErrorMessage className={css.error} name="regNum" component="span"/>
                    </div>
                    <div className={css.fieldsGroup}>
                        <label htmlFor="regDate">Від:</label>
                        <Field className={css.fInput} component={DatePickerField} id="regDate" name="regDate" placeholder="regDate"/>
                        <ErrorMessage className={css.error} name="regDate" component="span"/>
                    </div>
                </div>
                <div className={css.mainContentGroup}>
                    <div>
                        <div></div>
                        <div className={css.fieldsGroup}>
                            <label htmlFor="content">Зміст:</label>
                            <Field className={css.fInput} id="content" type="text" name="content" placeholder="Зміст"/>
                            <ErrorMessage className={css.error} name="content" component="span"/>
                        </div>
                    </div>
                    <div></div>
                </div>
                <div className={css.resolutionGroup}></div>
                <button className={css.submitBtn} type="submit">Зберегти</button>
            </Form>
        </Formik>
    );
};
