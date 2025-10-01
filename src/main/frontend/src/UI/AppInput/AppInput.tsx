import React, {ChangeEvent, FC} from 'react';
import css from './AppInput.module.css';
import uuid from 'react-uuid';
import {FormErrorMap} from "../../models/AppTypes";

interface InputProps {
    inputType: string | 'text';
    inputLabel: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    errorMessage?: string;
}

const AppInput: FC<InputProps> = ({
                                      inputType,
                                      inputLabel,
                                      value,
                                      onChange,
                                      errorMessage,

                                  }) => {
    const htmlFor: string = uuid();

    const isInvalid = () => {
        return !!errorMessage;
    }

    const cls = [css.AppInput];
    if (isInvalid()) {
        cls.push(css.invalid);
    }

    return (
        <div className={cls.join(' ')}>
            <div className={css.formField}>
                <label htmlFor={htmlFor}>{inputLabel}</label>
                <input type={inputType} id={htmlFor} value={value} onChange={onChange}/>
            </div>

            {isInvalid() ? <span>{errorMessage}</span> : null}
        </div>
    );
};

export default AppInput;
