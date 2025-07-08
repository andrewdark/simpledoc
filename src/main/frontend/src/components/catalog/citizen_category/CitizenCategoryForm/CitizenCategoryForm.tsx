import React, {FC} from 'react';
import {Field, Form, Formik} from "formik";
import css from "../../../../default_styles/Form.module.css";
import {ICitizenCategory} from "../../../../models/catalog/ICitizenCategory";
import * as Yup from "yup";
import {useAppSelector} from "../../../../hooks/redux";

const validationSchema = Yup.object().shape({
    id: Yup.number().nullable(),

});

interface CitizenCategoryFormProps {
    formHandler: (citizenCategory: ICitizenCategory) => void;
}

export const CitizenCategoryForm: FC<CitizenCategoryFormProps> = (props) => {
    const itemForUpdate = useAppSelector(state => state.citizenCategoryReducer.item);
    const handleSubmit = (values: any, actions: any) => {
        props.formHandler(values);
        actions.resetForm();
    };

    const initialValues: ICitizenCategory = {
        name: ""
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
