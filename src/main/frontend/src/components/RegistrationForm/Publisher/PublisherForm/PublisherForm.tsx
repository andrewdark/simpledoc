import React, {FC} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import css from "../../../../default_styles/Form.module.css";
import * as Yup from "yup";
import {useAppSelector} from "../../../../hooks/redux";
import {IPublisher, PublisherType} from "../../../../models/IPublisher";
import {DatePickerField} from "../../../DatePickerField/DatePickerField";

const validationSchema = Yup.object().shape({
    id: Yup.number().nullable(),
    });


interface PublisherFormProps {
    publisherType: typeof PublisherType[keyof typeof PublisherType];
    formHandler: (publisher: IPublisher) => void;
}

export const PublisherForm: FC<PublisherFormProps> = (props) => {
    const itemForUpdate = useAppSelector(state => state.citizenReducer.item);
    const handleSubmit = (values: any, actions: any) => {
        props.formHandler(values);
        actions.resetForm();
    };

    const initialValues: IPublisher = {
        id: null,
        official: null,
        signingDate: new Date,
        note: '',
        publisherType: props.publisherType,
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}
                enableReinitialize={true}>
            <Form className={css.form}>
                <Field type="hidden" name="id"/>
                <Field type="hidden" name="publisherType"/>
                <div className={css.fieldsGroup}>
                    <label htmlFor="signingDate">Дата:</label>
                    <Field className={css.fInput} component={DatePickerField} id="signingDate" name="signingDate"
                           placeholder="Дата підпису"/>
                    <ErrorMessage className={css.error} name="signingDate" component="span"/>
                </div>
                <div className={css.fieldsGroup}>
                    <label htmlFor="official">
                        {PublisherType.SIGNATORY===props.publisherType && 'Підписав:'}
                        {PublisherType.SIGNATORY===props.publisherType && 'Завізував:'}
                        {PublisherType.SIGNATORY===props.publisherType && 'Підготовив:'}
                    </label>
                    <Field className={css.fInput} type="text" id="official" name="official"
                           placeholder="official"/>
                    <ErrorMessage className={css.error} name="official" component="span"/>
                </div>
                <div className={css.fieldsGroup}>
                    <label htmlFor="note">Примітка:</label>
                    <Field className={css.fInput} type="text" id="note" name="note" placeholder="note"/>
                    <ErrorMessage className={css.error} name="note" component="span"/>
                </div>
                <button className={css.submitBtn} type="submit">Зберегти</button>
            </Form>
        </Formik>
    );
};
