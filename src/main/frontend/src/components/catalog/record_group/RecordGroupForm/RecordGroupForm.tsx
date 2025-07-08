import React, {FC} from 'react';
import {IRecordGroup, RecordGroupType} from "../../../../models/catalog/IRecordGroup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import css from "../../../../default_styles/Form.module.css";
import * as Yup from "yup";
import {useAppSelector} from "../../../../hooks/redux";

const validationSchema = Yup.object().shape({
    id: Yup.number().nullable(),
    name: Yup.string().min(2, "Занадто коротке!").max(250, "Занадто довге!").required("Обов\'язкове поле"),
    node: Yup.boolean().required("Обов\'язкове поле"),
    recordGroupType: Yup.string().required("Обов\'язкове поле"),
    indexNum: Yup.string().min(2, "Занадто коротке!").max(250, "Занадто довге!"),
    templateNum: Yup.string().min(2, "Занадто коротке!").max(250, "Занадто довге!"),
});

interface RecordGroupFormProps {
    formHandler: (recordGroup: IRecordGroup) => void;
}

export const RecordGroupForm: FC<RecordGroupFormProps> = (props) => {
    const itemForUpdate = useAppSelector(state => state.recordGroupReducer.item);
    const handleSubmit = (values: any, actions: any) => {
        props.formHandler(values);
        actions.resetForm();
    };

    const initialValues: IRecordGroup = {
        id: itemForUpdate ? itemForUpdate.id : null,
        name: itemForUpdate ? itemForUpdate.name : "",
        node: itemForUpdate ? itemForUpdate.node : true,
        recordGroupType: itemForUpdate ? itemForUpdate.recordGroupType : RecordGroupType.NODE,
        indexNum: itemForUpdate ? itemForUpdate.indexNum : "",
        templateNum: itemForUpdate ? itemForUpdate.templateNum : "",
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}
                enableReinitialize={true}>
            <Form className={css.form}>
                {itemForUpdate && <Field type="hidden" name="id"/>}
                <Field type="hidden" name="node"/>

                <div className={css.fieldsGroup}>
                    <label htmlFor="name">Назва журналу реєстрації:</label>
                    <Field className={css.fInput} id="name" type="text" name="name" placeholder="Назва журналу"/>
                    <ErrorMessage className={css.error} name="name" component="span"/>
                </div>
                <div className={css.fieldsGroup}>
                    <label htmlFor="recordGroupType">Виберіть тип:</label>
                    <Field as="select" id="recordGroupType" name="recordGroupType">
                        <option value="" disabled>-- Виберіть тип --</option>
                        <option value={RecordGroupType.NODE}>Вершина</option>
                        <option value={RecordGroupType.INCOMING}>Вхідні документи</option>
                        <option value={RecordGroupType.CITIZEN}>Звернення громадян</option>
                        <option value={RecordGroupType.OUTGOING}>Вихідні документи</option>
                        <option value={RecordGroupType.INNER}>Внутрішнє листування</option>
                    </Field>
                    <ErrorMessage className={css.error} name="recordGroupType" component="span"/>
                </div>

                <div className={css.fieldsGroup}>
                    <label htmlFor="indexNum">Індекс:</label>
                    <Field className={css.fInput} id="indexNum" type="text" name="indexNum" placeholder="Індекс"/>
                    <ErrorMessage className={css.error} name="indexNum" component="span"/>
                </div>
                <div className={css.fieldsGroup}>
                    <label htmlFor="templateNum">Шаблон:</label>
                    <Field className={css.fInput} id="templateNum" type="text" name="templateNum" placeholder="Шаблон"/>
                    <ErrorMessage className={css.error} name="templateNum" component="span"/>
                </div>

                <button className={css.submitBtn} type="submit">Зберегти</button>
            </Form>
        </Formik>
    );
};
