import React, {FC} from 'react';
import {IRecordGroup, RecordGroupType} from "../../../../models/catalog/IRecordGroup";
import {Field, Form, Formik} from "formik";
import css from "../../../../default_styles/Form.module.css";
import * as Yup from "yup";
import {useAppSelector} from "../../../../hooks/redux";

const validationSchema = Yup.object().shape({
    id: Yup.number().nullable(),

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
        name: "",
        node: true,
        recordGroupType: RecordGroupType.NODE,
        indexNum: "",
        templateNum: "",
        deleted: false,
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} enableReinitialize={true}>
            <Form className={css.form}>
                <div className={css.fieldsGroup}>
                    <Field className={css.fInput} type="text" name="name" placeholder="Name"/>
                </div>

                <button className={css.submitBtn} type="submit">Submit</button>
            </Form>
        </Formik>
    );
};
