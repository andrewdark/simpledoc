import React, {FC} from "react";
import {Field, Form, Formik} from "formik";
import css from "../../../../default_styles/Form.module.css";
import {IDelivery} from "../../../../models/catalog/IDelivery";

const initialValues: IDelivery = {
    name: ""
};

interface DeliveryFormProps {
    deliveryFormHandler: (delivery: IDelivery) => void;
}

export const DeliveryForm: FC<DeliveryFormProps> = (props) => {
    const handleSubmit = (values: any, actions: any) => {
        props.deliveryFormHandler(values);
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
