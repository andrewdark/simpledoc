import React, {FC} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import css from "../../../../default_styles/Form.module.css";
import {ICitizen} from "../../../../models/catalog/ICitizen";
import * as Yup from "yup";
import {useAppSelector} from "../../../../hooks/redux";

const validationSchema = Yup.object().shape({
    id: Yup.number().nullable(),
    fullName: Yup.string().min(2, "Занадто коротке!").max(250, "Занадто довге!").required("Обов\'язкове поле"),
    address: Yup.string().min(2, "Занадто коротке!").max(250, "Занадто довге!").required("Обов\'язкове поле"),
});


interface CitizenFormProps {
    formHandler: (citizen: ICitizen) => void;
}

export const CitizenForm: FC<CitizenFormProps> = (props) => {
    const itemForUpdate = useAppSelector(state => state.citizenReducer.item);
    const handleSubmit = (values: any, actions: any) => {
        props.formHandler(values);
        actions.resetForm();
    };

    const initialValues: ICitizen = {
        id: itemForUpdate ? itemForUpdate.id : null,
        fullName: itemForUpdate ? itemForUpdate.fullName :"",
        address: itemForUpdate ? itemForUpdate.address :"",
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} enableReinitialize={true}>
            <Form className={css.form}>
                {itemForUpdate && <Field type="hidden" name="id" />}
                <div className={css.fieldsGroup}>
                    <label htmlFor="fullName">ПІБ громадянина:</label>
                    <Field className={css.fInput} id="fullName" type="text" name="fullName" placeholder="ПІБ громадянина"/>
                    <ErrorMessage className={css.error} name="fullName" component="span"/>
                </div>
                <div className={css.fieldsGroup}>
                    <label htmlFor="address">Адреса громадянина:</label>
                    <Field className={css.fInput} id="address" type="text" name="address" placeholder="Адреса громадянина"/>
                    <ErrorMessage className={css.error} name="address" component="span"/>
                </div>

                <button className={css.submitBtn} type="submit">Зберегти</button>
            </Form>
        </Formik>
    );
};
