import React, {FC} from 'react';
import {ICitizenStatus} from "../../../../models/catalog/ICitizenStatus";
import {Field, Form, Formik} from "formik";
import css from "../../../../default_styles/Form.module.css";
import * as Yup from "yup";
import {useAppSelector} from "../../../../hooks/redux";

const validationSchema = Yup.object().shape({
    id: Yup.number().nullable(),

});

interface CitizenStatusFormProps {
    formHandler: (citizenStatus: ICitizenStatus) => void;
}

export const CitizenStatusForm: FC<CitizenStatusFormProps> = (props) => {
    const itemForUpdate = useAppSelector(state => state.citizenStatusReducer.item);
    const handleSubmit = (values: any, actions: any) => {
        props.formHandler(values);
        actions.resetForm();
    };

    const initialValues: ICitizenStatus = {
        name: "",
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
