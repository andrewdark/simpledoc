import React, {FC, useEffect} from 'react';
import * as Yup from "yup";
import {IRecordSearchFilter} from "../../models/IRecordSearchFilter";
import {ErrorMessage, Field, Form, Formik} from "formik";
import css from "./SearchEngineForm.module.css";
import {DatePickerField} from "../DatePickerField/DatePickerField";
import {RecordGroupType} from "../../models/catalog/IRecordGroup";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {getAllRecordGroup} from "../../redux/catalog/record_group/operations";
import {clearRecords} from "../../redux/record/slice";

const validationSchema = Yup.object().shape({
    withRecordGroup: Yup.boolean().nullable()
});

interface SearchEngineFormProps {
    formHandler: (formHandler: IRecordSearchFilter) => void;
}

export const SearchEngineForm: FC<SearchEngineFormProps> = ({formHandler}) => {
    const docGroups = useAppSelector(state => state.recordGroupReducer.items);
    const dispatch = useAppDispatch();

    const initialValues: IRecordSearchFilter = {

        recordGroupType: null,
        regDateFrom: null,
        regDateTo: null,
        recordGroupName: null,
        orderNum: null,
        regNum: null,
        withRecordGroup: true,
    };

    const handleSubmit = (values: any, actions: any) => {
        formHandler(values);
        actions.resetForm();
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}
                enableReinitialize={true}>
            <Form className={css.form}>
                <div>
                    <div className={[css.fieldsGroup, css.docGroupNumber].join(" ")}>
                        <div>
                            <label htmlFor="orderNum">№:</label>
                            <Field className={css.fInput} id="orderNum" type="text" name="orderNum"
                                   placeholder="orderNum"/>
                            <ErrorMessage className={css.error} name="orderNum" component="span"/>
                        </div>
                        <div>
                            <label htmlFor="regNum">/</label>
                            <Field className={css.fInput} type="text" id="regNum" name="regNum"
                                   placeholder="regNum"/>
                            <ErrorMessage className={css.error} name="regNum" component="span"/>
                        </div>
                    </div>
                    <div className={css.fieldsGroup}>
                        <div className={css.docGroupDate}>
                            <div>
                                <label htmlFor="regDateFrom">Від:</label>
                                <Field className={css.fInput} component={DatePickerField} id="regDateFrom"
                                       name="regDateFrom"
                                       placeholder="From"/>
                                <ErrorMessage className={css.error} name="regDateFrom" component="span"/>
                            </div>
                            <div>
                                <label htmlFor="regDateTo">До:</label>
                                <Field className={css.fInput} component={DatePickerField} id="regDateTo"
                                       name="regDateTo"
                                       placeholder="To"/>
                                <ErrorMessage className={css.error} name="regDateTo" component="span"/>
                            </div>
                        </div>
                    </div>
                    <div className={css.fieldsGroup}>
                        <label htmlFor="recordGroupType">По типу документу:</label>
                        <Field as="select" id="recordGroupType" name="recordGroupType"
                               className={css.appSelectComponent}>
                            <option value={undefined}>--Тип групи документу--</option>
                            <option value={RecordGroupType.INCOMING}>Вхідні</option>
                            <option value={RecordGroupType.OUTGOING}>Вихідні</option>
                            <option value={RecordGroupType.CITIZEN}>Звернення громадян</option>
                            <option value={RecordGroupType.INNER}>Внутрішні документи</option>
                        </Field>
                        <ErrorMessage className={css.error} name="recordGroupType" component="span"/>
                    </div>
                    <div className={css.fieldsGroup}>
                        <label htmlFor="recordGroupName">Назва групи документів:</label>
                        <Field as="select" id="recordGroupName" name="recordGroupName"
                               className={css.appSelectComponent}>
                            <option value={undefined}>--Назва групи документів--</option>
                            {docGroups.filter(el => el.recordGroupType !== RecordGroupType.NODE).map(el =>
                                <option key={el.id} value={el.name}>{el.name}</option>
                            )}

                        </Field>
                        <ErrorMessage className={css.error} name="recordGroupName" component="span"/>
                    </div>
                </div>

                <button className={css.submitBtn} type="submit">Шукати</button>
            </Form>
        </Formik>
    );
};
