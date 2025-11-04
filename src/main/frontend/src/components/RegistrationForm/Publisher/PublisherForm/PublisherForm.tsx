import React, {ChangeEvent, FC, useState} from 'react';
import css from "../../../../default_styles/Form.module.css";
import * as Yup from "yup";
import {IPublisher, PublisherType} from "../../../../models/IPublisher";
import AppDatePicker from "../../../../UI/AppDatePicker/AppDatePicker";
import {CorrespondentType} from "../../../../models/ICorrespondent";
import {PublisherAutocompleteInput} from "../PublisherAutocompleteInput/PublisherAutocompleteInput";
import {IDepartment} from "../../../../models/catalog/IDepartment";

const validationSchema = Yup.object().shape({
    id: Yup.number().nullable(),
});


interface PublisherFormProps {
    publisherType: typeof PublisherType[keyof typeof PublisherType] | null;
    formHandler: (publisher: IPublisher | null) => void;
}

export const PublisherForm: FC<PublisherFormProps> = (props) => {
    const [id, setId] = useState<number | null>(null);
    const [signingDate, setSigningDate] = useState<Date | null>(new Date());
    const [official, setOfficial] = useState<IDepartment | null>(null);
    const [note, setNote] = useState<string>('');
    const [disabled, setDisabled] = useState<boolean>(false);

    const handleNoteChange = (event: ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        setNote(val);
    };

    const handleSubmit = () => {
        if (props.publisherType && official) {
            const dto: IPublisher = {
                id: null,
                official: official,
                signingDate: signingDate,
                publisherType: props.publisherType,
                note: note
            }
            props.formHandler(dto);
        } else {
            props.formHandler(null);
        }

    };

    return (
        <div className={css.registrationForm}>
            <div className={css.fieldsGroup}>
                <label htmlFor="signingDate">Дата:</label>
                <AppDatePicker inputLabel={""} value={signingDate} onChange={setSigningDate}/>
                <span className={css.error}/>
            </div>
            <div className={css.fieldsGroup}>
                <label htmlFor="official">
                    {PublisherType.SIGNATORY === props.publisherType && 'Підписав:'}
                    {PublisherType.APPROVER === props.publisherType && 'Завізував:'}
                    {PublisherType.EXECUTANT === props.publisherType && 'Підготовив:'}
                </label>
                <PublisherAutocompleteInput correspondentType={CorrespondentType.OUTGOING_ORGANIZATION}
                                                department={official}
                                                setDepartment={setOfficial}
                                               disabled={disabled}/>
                <span className={css.error}/>
            </div>
            <div className={css.fieldsGroup}>
                <label htmlFor="note">Примітка:</label>
                <input className={css.fInput} type="text" id="note" name="note" placeholder="note" value={note}
                       onChange={handleNoteChange}/>
                <span className={css.error}/>
            </div>
            <button className={css.submitBtn} type="button" onClick={handleSubmit}>Зберегти</button>
        </div>
    );
};
