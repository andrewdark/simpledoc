import React, {FC} from 'react';
import {IOrganization} from "../../../../models/catalog/IOrganization";
import {ErrorMessage, Field, Form, Formik} from "formik";
import css from "../../../../default_styles/Form.module.css";
import * as Yup from "yup";
import {useAppSelector} from "../../../../hooks/redux";

const validationSchema = Yup.object().shape({
    id: Yup.number().nullable(),
    name: Yup.string().min(2, "Занадто коротке!").max(250, "Занадто довге!").required("Обов\'язкове поле"),
    code: Yup.string().min(8, "Занадто короткий!").max(12, "Занадто довгий!").required("Обов\'язкове поле"),

});

interface OrganizationFormProps {
    formHandler: (organization: IOrganization) => void;
}

export const OrganizationForm: FC<OrganizationFormProps> = (props) => {
    const itemForUpdate = useAppSelector(state => state.organizationReducer.item);
    const handleSubmit = (values: any, actions: any) => {
        props.formHandler(values);
        actions.resetForm();
    };

    const initialValues: IOrganization = {
        id: itemForUpdate ? itemForUpdate.id : null,
        name: itemForUpdate ? itemForUpdate.name : "",
        code: itemForUpdate ? itemForUpdate.code : "",
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}
                enableReinitialize={true}>
            <Form className={css.form}>
                {itemForUpdate && <Field type="hidden" name="id"/>}
                <div className={css.fieldsGroup}>
                    <label htmlFor="name">Назва статуса:</label>
                    <Field className={css.fInput} type="text" name="name" placeholder="Name"/>
                    <ErrorMessage className={css.error} name="name" component="span"/>
                </div>
                <div className={css.fieldsGroup}>
                    <label htmlFor="code">Назва статуса:</label>
                    <Field className={css.fInput} type="text" name="code" placeholder="Code"/>
                    <ErrorMessage className={css.error} name="code" component="span"/>
                </div>
                <button className={css.submitBtn} type="submit">Зберегти</button>
            </Form>
        </Formik>
    );
};
