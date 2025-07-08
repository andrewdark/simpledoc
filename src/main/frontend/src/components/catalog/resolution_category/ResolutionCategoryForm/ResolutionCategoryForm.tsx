import React, {FC} from 'react';
import {IResolutionCategory} from "../../../../models/catalog/IResolutionCategory";
import {ErrorMessage, Field, Form, Formik} from "formik";
import css from "../../../../default_styles/Form.module.css";
import * as Yup from "yup";
import {useAppSelector} from "../../../../hooks/redux";

const validationSchema = Yup.object().shape({
    id: Yup.number().nullable(),
    name: Yup.string().min(2, "Занадто коротка!").max(250, "Занадто довга!").required("Обов\'язкове поле"),
});

interface ResolutionCategoryFormProps {
    formHandler: (resolutionCategory: IResolutionCategory) => void;
}

export const ResolutionCategoryForm: FC<ResolutionCategoryFormProps> = (props) => {
    const itemForUpdate = useAppSelector(state => state.resolutionCategoryReducer.item);
    const handleSubmit = (values: any, actions: any) => {
        props.formHandler(values);
        actions.resetForm();
    };

    const initialValues: IResolutionCategory = {
        id: itemForUpdate ? itemForUpdate.id : null,
        name: itemForUpdate ? itemForUpdate.name : ""
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

                <button className={css.submitBtn} type="submit">Зберегти</button>
            </Form>
        </Formik>
    );
};
