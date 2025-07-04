import React, {FC} from 'react';
import {IRecordGroup, RecordGroupType} from "../../../../models/catalog/IRecordGroup";
import {Field, Form, Formik} from "formik";
import css from "../../../../default_styles/Form.module.css";

const initialValues: IRecordGroup = {
    name: "",
    node: true,
    recordGroupType: RecordGroupType.NODE,
    indexNum: "",
    templateNum: "",
    deleted: false,
};

interface RecordGroupFormProps {
    formHandler: (recordGroup: IRecordGroup) => void;
}

const RecordGroupForm: FC<RecordGroupFormProps> = (props) => {

    const handleSubmit = (values: any, actions: any) => {
        props.formHandler(values);
        actions.resetForm();
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className={css.form}>
                <div className={css.fieldsGroup}>
                    <Field className={css.fInput} type="text" name="name" placeholder="Name"/>
                </div>

                <button className={css.submitBtn} type="submit">Submit</button>
            </Form>
        </Formik>
    );
};

export default RecordGroupForm;
