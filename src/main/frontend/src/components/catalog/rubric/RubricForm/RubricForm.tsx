import React, {FC} from 'react';
import {Field, Form, Formik} from "formik";
import css from "../../../../default_styles/Form.module.css";
import {IRubric} from "../../../../models/catalog/IRubric";
import * as Yup from "yup";
import {useAppSelector} from "../../../../hooks/redux";

const validationSchema = Yup.object().shape({
    id: Yup.number().nullable(),

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
        name: "",
        node: false,
        deleted: false
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
