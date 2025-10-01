import React, {ChangeEvent, FC} from 'react';
import css from './AppTextArea.module.css';
import uuid from 'react-uuid';

interface TextAreaProps {
    resize?: boolean;
    disabled?: boolean;
    inputLabel: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    errorMessage?: string;
}

const AppTextArea: FC<TextAreaProps> = ({
                                            resize,
                                            disabled,
                                            inputLabel,
                                            value,
                                            onChange,
                                            errorMessage
                                        }) => {
    const htmlFor: string = uuid();

    const isInvalid = () => {
        return !!errorMessage;
    }

    const cls = [css.AppTextArea];

    const textAreaCls: string[] = [];
    if (isInvalid()) {
        cls.push(css.invalid);
    }
    if (!resize) {
        textAreaCls.push(css.resizable);
    }
    return (
        <div className={cls.join(' ')}>
            <div className={css.formField}>
                <label htmlFor={htmlFor}>{inputLabel}</label>
                <textarea disabled={disabled ?? false} id={htmlFor} value={value} onChange={onChange}
                          className={textAreaCls.join(' ')}/>
            </div>
            {isInvalid() ? <span>{errorMessage}</span> : null}
        </div>
    );
};

export default AppTextArea;
