import React, {FC} from 'react';
import {Field, Form, Formik} from "formik";
import css from "../../../../default_styles/Form.module.css";
import {IRubric} from "../../../../models/catalog/IRubric";
import {ICitizen} from "../../../../models/catalog/ICitizen";

const initialValues: IRubric = {
    name: "",
    node: false,
    deleted: false
};

interface RubricFormProps {
    formHandler: (rubric: IRubric) => void;
}

const RubricForm: FC<RubricFormProps> = (props) => {

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

export default RubricForm;
