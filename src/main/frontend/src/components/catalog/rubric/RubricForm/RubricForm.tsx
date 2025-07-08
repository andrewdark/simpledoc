import React, {FC} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import css from "../../../../default_styles/Form.module.css";
import {IRubric} from "../../../../models/catalog/IRubric";
import * as Yup from "yup";
import {useAppSelector} from "../../../../hooks/redux";

const validationSchema = Yup.object().shape({
    id: Yup.number().nullable(),
    name: Yup.string().min(2, "Занадто коротка!").max(250, "Занадто довга!").required("Обов\'язкове поле"),
    node: Yup.boolean().required("")
});

interface RubricFormProps {
    formHandler: (rubric: IRubric) => void;
}

export const RubricForm: FC<RubricFormProps> = (props) => {
    const itemForUpdate = useAppSelector(state => state.rubricReducer.item);
    const handleSubmit = (values: any, actions: any) => {
        props.formHandler(values);
        actions.resetForm();
    };

    const initialValues: IRubric = {
        id: itemForUpdate ? itemForUpdate.id : null,
        name: itemForUpdate ? itemForUpdate.name : "",
        node: itemForUpdate ? itemForUpdate.node : false,
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}
                enableReinitialize={true}>
            <Form className={css.form}>
                {itemForUpdate && <Field type="hidden" name="id"/>}
                <Field type="hidden" name="node"/>
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
