import React, {FC} from 'react';
import {CorrespondentType, ICorrespondent} from "../../../models/ICorrespondent";
import css from "../../../default_styles/Form.module.css";
import * as Yup from "yup";
import {useAppSelector} from "../../../hooks/redux";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {DatePickerField} from "../../DatePickerField/DatePickerField";

interface CorrespondentFormProps {
    formHandler: (registration: ICorrespondent) => void;
    correspondentType: typeof CorrespondentType.INCOMING_ORGANIZATION | typeof CorrespondentType.INCOMING_CITIZEN;
}

const validationSchema = Yup.object().shape({
        organizationId: Yup.number().nullable().when('correspondentType', {
            is: CorrespondentType.INCOMING_ORGANIZATION,
            then: schema => schema.required('Оберіть організацію')
        }),
        citizenId: Yup.number().nullable().when('correspondentType', {
            is: CorrespondentType.INCOMING_CITIZEN,
            then: schema => schema.required('Оберіть громадянина')
        }),
    }
);

export const CorrespondentForm: FC<CorrespondentFormProps> = ({formHandler, correspondentType}) => {
    const citizens = useAppSelector(state => state.citizenReducer.items);
    const organizations = useAppSelector(state => state.organizationReducer.items);

    const handleSubmit = (values: any, actions: any) => {
        console.log("orgId", values.organizationId);
        console.log("citId", values.citizenId);
        if (CorrespondentType.INCOMING_ORGANIZATION === correspondentType) {
            values = {...values, organization: organizations.find(el => el.id == values.organizationId)};
        }
        if (CorrespondentType.INCOMING_CITIZEN === correspondentType) {
            values = {...values, citizen: citizens.find(el => el.id == values.citizenId)};
        }
        formHandler(values);
        actions.resetForm();
    };

    const initialValues: ICorrespondent = {
        id: null,
        outNum: null,
        outDate: new Date,
        note: "",
        signatory: "",
        correspondentType: correspondentType,
        organization: null,
        organizationId: null,
        citizen: null,
        citizenId: null
    };
    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}
                enableReinitialize={true}>
            <Form className={css.form}>
                <Field type="hidden" name="id"/>
                <Field type="hidden" name="correspondentType"/>
                {CorrespondentType.INCOMING_ORGANIZATION === correspondentType ?
                    <>
                        <div className={css.fieldsGroup}>
                            <label htmlFor="organizationId">Виберіть організацію:</label>
                            <Field as="select" id="organizationId" name="organizationId" className={css.fInput}>
                                <option value="">-- Виберіть організацію --</option>
                                {organizations.filter(el=>el.id).map(el => <option key={el.id}
                                                                 value={el.id ?? 0}>{el.name} - {el.code}</option>)}
                            </Field>
                            <ErrorMessage name="organizationId" component="div" className={css.error}/>
                        </div>
                        <div className={css.fieldsGroup}>
                            <label htmlFor="outNum">Вих. номер:</label>
                            <Field className={css.fInput} type="text" id="outNum" name="outNum" placeholder="outNum"/>
                            <ErrorMessage className={css.error} name="outNum" component="span"/>
                        </div>
                        <div className={css.fieldsGroup}>
                            <label htmlFor="outDate">Дата:</label>
                            <Field className={css.fInput} component={DatePickerField} id="outDate" name="outDate"
                                   placeholder="outDate"/>
                            <ErrorMessage className={css.error} name="outDate" component="span"/>
                        </div>
                        <div className={css.fieldsGroup}>
                            <label htmlFor="signatory">Підписав:</label>
                            <Field className={css.fInput} type="text" id="signatory" name="signatory"
                                   placeholder="signatory"/>
                            <ErrorMessage className={css.error} name="signatory" component="span"/>
                        </div>
                        <div className={css.fieldsGroup}>
                            <label htmlFor="note">Примітка:</label>
                            <Field className={css.fInput} type="text" id="note" name="note" placeholder="note"/>
                            <ErrorMessage className={css.error} name="note" component="span"/>
                        </div>
                    </>
                    : null
                }
                {CorrespondentType.INCOMING_CITIZEN === correspondentType ?
                    <div className={css.fieldsGroup}>
                        <label htmlFor="citizenId">Виберіть громадянина:</label>
                        <Field as="select" id="citizenId" name="citizenId" className={css.fInput}>
                            <option value="">-- Виберіть громадянина --</option>
                            {citizens.filter(el=>el.id).map(el => <option key={el.id}
                                                        value={el.id ?? 0}>{el.fullName} - {el.address}</option>)}
                        </Field>
                        <ErrorMessage name="citizenId" component="div" className={css.error}/>
                    </div>
                    : null
                }

                <button className={css.submitBtn} type="submit">Зберегти</button>
            </Form>
        </Formik>
    );
};
