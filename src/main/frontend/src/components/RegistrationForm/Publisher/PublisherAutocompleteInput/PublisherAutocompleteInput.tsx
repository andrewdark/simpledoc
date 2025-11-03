// CorrespondentAutocompleteInput.tsx (перероблено на TS)
import React, {ChangeEvent, FC, MouseEvent, useCallback, useEffect, useState} from 'react';
import {debounce} from 'lodash';
import css from './PublisherAutocompleteInput.module.css';
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";

import {CorrespondentType} from "../../../../models/ICorrespondent";
import {IDepartment} from "../../../../models/catalog/IDepartment";
import {getAllDepartmentByName} from "../../../../redux/catalog/department/operations";
import {clearDepartments} from "../../../../redux/catalog/department/slice";

interface AutocompleteInputProps {
    correspondentType: typeof CorrespondentType[keyof typeof CorrespondentType];
    disabled: boolean;
    department: IDepartment | null;
    setDepartment: (val: IDepartment) => void;
}

export const PublisherAutocompleteInput: FC<AutocompleteInputProps> = ({
                                                                           correspondentType, disabled,
                                                                           department,
                                                                           setDepartment
                                                                       }) => {
    // Типізуємо useState для поля вводу та вибраного елемента
    const departments: IDepartment[] = useAppSelector(state => state.departmentReducer.items);
    const [inputValue, setInputValue] = useState<string>('');
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (CorrespondentType.OUTGOING_ORGANIZATION === correspondentType) {
            setInputValue(department?.name ?? '');
        }
    }, [department]);

    // Використовуємо useCallback для мемоізації функції та типізуємо її
    const debouncedFetchSuggestions = useCallback(
        debounce((query: string) => {

            if (query.length >= 2) {
                if (CorrespondentType.OUTGOING_ORGANIZATION === correspondentType) {
                    dispatch(getAllDepartmentByName({searchQuery: query}));
                    console.log("departments ", departments.length)
                }
            } else {
                dispatch(clearDepartments());
            }
        }, 500),
        [dispatch]
    );

    useEffect(() => {
        debouncedFetchSuggestions(inputValue);
    }, [inputValue, debouncedFetchSuggestions]);

    // Типізуємо обробник події зміни в input
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        setSelectedItem(null);
    };

    // Типізуємо обробник події кліку на елементі списку
    const handleSelectDepartment = (suggestion: IDepartment, event: MouseEvent<HTMLLIElement>) => {
        setDepartment(suggestion);
        setInputValue(suggestion.name);
        setSelectedItem(suggestion.name);
    };

    return (
        <div className={css.autocompleteContainer}>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Почніть вводити текст..."
                className={css.autocompleteInput} disabled={disabled}
            />

            {/*{loading && <div className="loading-indicator">Завантаження...</div>}*/}

            {/*  {error && <div className="error-message">Помилка: {error}</div>}*/}

            {CorrespondentType.OUTGOING_ORGANIZATION === correspondentType && departments.length > 0 && !selectedItem && (
                <ul className={css.suggestionsList}>
                    {departments.map((item, index) => (
                        <li key={index} onClick={(event) => handleSelectDepartment(item, event)}>
                            {item.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
