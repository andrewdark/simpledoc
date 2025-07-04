import React, {FC} from 'react';
import {IDepartment} from "../../../../models/catalog/IDepartment";
import {Field, Form, Formik, ErrorMessage, useFormikContext} from "formik";
import css from "../../../../default_styles/Form.module.css";

const initialValues: IDepartment = {
    name: "",
    position: "",
    official: false,
    deleted: false,
    parent: null
};

interface DepartmentFormProps {
    formHandler: (department: IDepartment) => void;
}

// Допоміжний компонент для рендерингу додаткового поля
// Використовуємо useFormikContext, щоб отримати доступ до значень форми
const ConditionalShadeField = () => {
    const {values} = useFormikContext<IDepartment>(); // Отримуємо доступ до об'єкта 'values' з Formik

    // Перевіряємо, чи має бути відображене поле "favoriteShade"
    const shouldShowShadeField = values.official;

    if (!shouldShowShadeField) {
        // Якщо поле не повинно відображатися, просто нічого не рендеримо
        return null;
    }

    return (
        <div className={css.fieldsGroup}>
            <label htmlFor="position">Посада:</label>
            <Field className={css.fInput} type="text" name="position" placeholder="Position"/>
        </div>
    );
};

const DepartmentForm: FC<DepartmentFormProps> = (props) => {

    const handleSubmit = (values: any, actions: any) => {
        props.formHandler(values);
        actions.resetForm();
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className={css.form}>
                <div className={css.fieldsGroup}>
                    <label htmlFor="name">Ім'я підрозділу:</label>
                    <Field className={css.fInput} type="text" name="name" placeholder="Name"/>
                </div>
                <div className={css.fieldsGroup}>
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: '5px'}}>
                        {/* Field для чекбокса */}
                        <Field type="checkbox" id="official" name="official" style={{marginRight: '8px'}}/>
                        <label htmlFor="official" style={{marginBottom: '0'}}>Посадова особа</label>
                    </div>
                    <ErrorMessage name="official" component="div" className="error"/>
                </div>
                {/*<div className={css.fieldsGroup}>*/}

                {/*    <label htmlFor="official">Улюблений колір:</label>*/}
                {/*    /!* Field для select *!/*/}
                {/*    <Field as="select" id="official" name="official">*/}
                {/*        <option value="">-- Виберіть тип --</option>*/}
                {/*        <option value="false">Підрозділ</option>*/}
                {/*        <option value="true">Посада</option>*/}
                {/*    </Field>*/}
                {/*    <ErrorMessage name="favoriteColor" component="div" className="error"/>*/}
                {/*</div>*/}
                <ConditionalShadeField/>
                <button className={css.submitBtn} type="submit">Submit</button>
            </Form>
        </Formik>
    );
};

export default DepartmentForm;
