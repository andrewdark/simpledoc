import React, {FC} from 'react';
import {Field, Form, Formik} from "formik";
import css from "../../../../default_styles/Form.module.css";
import {ICitizen} from "../../../../models/catalog/ICitizen";

const initialValues: ICitizen = {
    fullName: "",
    address: "",
    deleted: false,
};

interface CitizenFormProps {
    formHandler: (citizen: ICitizen) => void;
}

const CitizenForm: FC<CitizenFormProps> = (props) => {

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

export default CitizenForm;
