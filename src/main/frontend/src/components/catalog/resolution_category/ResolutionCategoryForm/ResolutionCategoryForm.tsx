import React, {FC} from 'react';
import {IResolutionCategory} from "../../../../models/catalog/IResolutionCategory";
import {Field, Form, Formik} from "formik";
import css from "../../../../default_styles/Form.module.css";

const initialValues: IResolutionCategory = {

};

interface ResolutionCategoryFormProps {
    formHandler: (resolutionCategory: IResolutionCategory) => void;
}

const ResolutionCategoryForm: FC<ResolutionCategoryFormProps> = (props) => {

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

export default ResolutionCategoryForm;
