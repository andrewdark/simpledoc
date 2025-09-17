import React, {FC} from 'react';
import {IRecord} from "../../models/IRecord";



interface RegistrationFormProps {
    formHandler: (registration: IRecord) => void;
}

export const RegistrationForm: FC<RegistrationFormProps> = (props) => {
    return <div>FORM</div>
};
