import React, {ChangeEvent, FC} from 'react';
import css from './AppDatePicker.module.css';
import uuid from 'react-uuid';
import {uk} from "date-fns/locale";
import DatePicker from "react-datepicker";

interface AppDatePickerProps {
    disabled?: boolean;
    inputLabel: string;
    value: Date | null;
    dateFormat?: string
    onChange: (date: (Date | null)) => void;
    errorMessage?: string;
}

const AppDatePicker: FC<AppDatePickerProps> = ({
                                                   disabled,
                                                   inputLabel,
                                                   value,
                                                   dateFormat,
                                                   onChange,
                                                   errorMessage
                                               }) => {
    const htmlFor: string = uuid();

    const isInvalid = () => {
        return !!errorMessage;
    }

    const cls = [css.AppDatePicker];
    if (isInvalid()) {
        cls.push(css.invalid);
    }

    return (
        <div className={cls.join(' ')}>
            <div className={css.formField}>
                <label htmlFor={htmlFor}>{inputLabel}</label>
                <div className={css.datePickerField}>
                    <DatePicker
                        id={htmlFor}
                        disabled={disabled ?? false}
                        locale={uk}
                        selected={value} // Текущая выбранная дата
                        onChange={(date) => onChange(date)} // Функция для обновления состояния
                        dateFormat={dateFormat ?? "dd.MM.yyyy"} // Формат отображения даты
                    />
                </div>

            </div>
            {isInvalid() ? <span>{errorMessage}</span> : null}
        </div>
    );
};

export default AppDatePicker;
