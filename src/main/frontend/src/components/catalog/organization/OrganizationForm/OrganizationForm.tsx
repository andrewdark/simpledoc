import React, {FC} from 'react';
import {IOrganization} from "../../../../models/catalog/IOrganization";
import {Field, Form, Formik} from "formik";
import css from "../../../../default_styles/Form.module.css";
import * as Yup from "yup";
import {useAppSelector} from "../../../../hooks/redux";

const validationSchema = Yup.object().shape({
    id: Yup.number().nullable(),

});

interface OrganizationFormProps {
    formHandler: (organization: IOrganization) => void;
}

export const OrganizationForm: FC<OrganizationFormProps> = (props) => {
    const itemForUpdate = useAppSelector(state => state.organizationReducer.item);
    const handleSubmit = (values: any, actions: any) => {
        props.formHandler(values);
        actions.resetForm();
    };

    const initialValues: IOrganization = {
        name: "",
        code:"",
        deleted: false
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} enableReinitialize={true}>
            <Form className={css.form}>
                <div className={css.fieldsGroup}>
                    <Field className={css.fInput} type="text" name="name" placeholder="Name"/>
                </div>
                <div className={css.fieldsGroup}>
                    <Field className={css.fInput} type="text" name="code" placeholder="Code"/>
                </div>
                <button className={css.submitBtn} type="submit">Submit</button>
            </Form>
        </Formik>
    );
};
