import React, {FC} from 'react';
import {IResolution} from "../../../../models/catalog/IResolution";
import {Field, Form, Formik} from "formik";
import css from "../../../../default_styles/Form.module.css";

const initialValues: IResolution = {

};

interface ResolutionFormProps {
    formHandler: (resolution: IResolution) => void;
}

const ResolutionForm: FC<ResolutionFormProps> = (props) => {

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

export default ResolutionForm;
