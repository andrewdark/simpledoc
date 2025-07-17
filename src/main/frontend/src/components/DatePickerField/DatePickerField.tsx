import React from 'react';
import {FieldProps} from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { uk } from 'date-fns/locale';
import css from './DatePickerField.module.css';

// Кастомный компонент для интеграции DatePicker с Formik
export const DatePickerField: React.FC<FieldProps<Date | null> & { placeholder?: string }> = ({
                                                                                                 field,
                                                                                                 form,
                                                                                                 placeholder,
                                                                                             }) => {
    const currentValue = field.value as Date | null;

    return (
        <DatePicker
            className={css.datePickerField}
            locale={uk}
            placeholderText={placeholder}
            selected={currentValue}
            onChange={(val: Date | null) => {
                form.setFieldValue(field.name, val);
            }}
            dateFormat="yyyy-MM-dd"
        />
    );
};
