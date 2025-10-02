import React, {ChangeEvent, FC} from 'react';
import uuid from "react-uuid";
import css from "./AppDocNumber.module.css";
import {FormErrorMap} from "../../models/AppTypes";

interface AppDocNumberProps {
    disabled?: boolean;
    reverse?: boolean;
    inputLabel: string;
    errorObject: FormErrorMap;
    regNum: string;
    delimiter?: string;
    orderNum: number;
    handleRegNumChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleOrderNumChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AppDocNumber: FC<AppDocNumberProps> = ({
                                                 disabled,
                                                 reverse,
                                                 handleRegNumChange,
                                                 handleOrderNumChange,
                                                 inputLabel,
                                                 errorObject,
                                                 regNum,
                                                 delimiter,
                                                 orderNum
                                             }) => {
    const htmlFor: string = uuid();

    const isInvalid = () => {
        return !!errorObject.orderNum;
    }

    const cls = [css.AppDocNumber];
    if (isInvalid()) {
        cls.push(css.invalid);
    }
    return (
        <div className={cls.join(' ')}>
            <div className={css.formField}>
                <label htmlFor={htmlFor}>{inputLabel}</label>
                {
                    reverse ?
                        <div className={css.numberOfDocGroup}>
                            <input type="text" className={`${css.singleInputForNumber} ${css.regNumInput}`}
                                   value={regNum}
                                   onChange={handleRegNumChange}/>
                            <input type="text" className={`${css.singleInputForNumber} ${css.regDelimiterInput}`}
                                   value={delimiter ?? '/'}/>
                            <input type="text" className={`${css.singleInputForNumber} ${css.orderNumInput}`}
                                   value={orderNum}
                                   onChange={handleOrderNumChange}/>
                        </div> :
                        <div className={css.numberOfDocGroup}>
                            <input type="text" className={`${css.singleInputForNumber} ${css.orderNumInput}`}
                                   value={orderNum}
                                   onChange={handleOrderNumChange}/>
                            <input type="text" className={`${css.singleInputForNumber} ${css.regDelimiterInput}`}
                                   value={delimiter ?? '/'}/>
                            <input type="text" className={`${css.singleInputForNumber} ${css.regNumInput}`}
                                   value={regNum}
                                   onChange={handleRegNumChange}/>
                        </div>
                }
            </div>
            {isInvalid() ? <span>{errorObject.orderNum}</span> : null}
        </div>
    );
};

export default AppDocNumber;
