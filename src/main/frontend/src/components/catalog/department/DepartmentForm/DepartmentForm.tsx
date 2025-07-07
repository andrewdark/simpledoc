import React, {FC} from 'react';
import {IDepartment} from "../../../../models/catalog/IDepartment";
import {Field, Form, Formik, ErrorMessage, useFormikContext} from "formik";
import css from "../../../../default_styles/Form.module.css";
import * as Yup from "yup";
import {useAppSelector} from "../../../../hooks/redux";

const validationSchema = Yup.object().shape({
    id: Yup.number().nullable(),
    name: Yup.string().min(2, "Too Short!").max(100, "Too Long!").required("Required"),
    official: Yup.boolean(),
    position: Yup.string().when('official', {
        is: true, // Це може бути `true` або функція `(val: boolean) => val === true`
        // Але якщо перша форма не працює, то друга точно спрацює
        then: (schema) => schema.min(2, "Too Short!").max(100, "Too Long!").required('Required'),
        otherwise: (schema) => schema, // Просто повертаємо початкову схему без додаткових правил
    }),
});

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
            <Field className={css.fInput} type="text" id="position" name="position" placeholder="Position"/>
            <ErrorMessage className={css.error} name="position" component="span"/>
        </div>
    );
};

export const DepartmentForm: FC<DepartmentFormProps> = (props) => {
    const itemForUpdate = useAppSelector(state => state.departmentReducer.item);
    console.log("itemForUpdate: ", itemForUpdate);
    const handleSubmit = (values: IDepartment, actions: any) => {
        props.formHandler(values);
        actions.resetForm();
    };
    const initialValues: IDepartment = {
        id: itemForUpdate ? itemForUpdate.id : null,
        name: itemForUpdate ? itemForUpdate.name : "",
        position: itemForUpdate ? itemForUpdate.position : "",
        official: itemForUpdate ? itemForUpdate.official : false,
        deleted: itemForUpdate ? itemForUpdate.deleted : false,
        parent: itemForUpdate ? itemForUpdate.parent : null
    };
    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} enableReinitialize={true}>
            <Form className={css.form}>
                {itemForUpdate && <Field type="hidden" name="id" />}
                <div className={css.fieldsGroup}>
                    <label htmlFor="name">Ім'я підрозділу:</label>
                    <Field className={css.fInput} id="name" type="text" name="name" placeholder="Name" />
                    <ErrorMessage className={css.error} name="name" component="span"/>
                </div>
                <div className={css.fieldsGroup}>
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: '5px'}}>
                        {/* Field для чекбокса */}
                        <Field type="checkbox" id="official" name="official" style={{marginRight: '8px'}} />
                        <label htmlFor="official" style={{marginBottom: '0'}}>Посадова особа</label>
                        <ErrorMessage className={css.error} name="official" component="span"/>
                    </div>
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
