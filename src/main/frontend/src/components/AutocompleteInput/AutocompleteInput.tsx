// AutocompleteInput.tsx (перероблено на TS)
import React, {ChangeEvent, FC, MouseEvent, useCallback, useEffect, useState} from 'react';
import {debounce} from 'lodash';
import css from './AutocompleteInput.module.css';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {getAllOrganizationByName} from "../../redux/catalog/organization/operations";
import {getAllCitizenByFullName} from "../../redux/catalog/citizen/operations";
import {RecordGroupType} from "../../models/catalog/IRecordGroup";
import {IOrganization} from "../../models/catalog/IOrganization";
import {ICitizen} from "../../models/catalog/ICitizen";
import {clearOrganizations} from "../../redux/catalog/organization/slice";
import {clearCitizens} from "../../redux/catalog/citizen/slice";
import {CorrespondentType} from "../../models/ICorrespondent";

interface AutocompleteInputProps {
    correspondentType: typeof CorrespondentType[keyof typeof CorrespondentType];
    disabled: boolean;
    organization: IOrganization | null;
    setOrganization: (val: IOrganization) => void;
    citizen: ICitizen | null;
    setCitizen: (val: ICitizen) => void;
}

export const AutocompleteInput: FC<AutocompleteInputProps> = ({
                                                                  correspondentType, disabled,
                                                                  organization,
                                                                  setOrganization,
                                                                  citizen,
                                                                  setCitizen
                                                              }) => {
    // Типізуємо useState для поля вводу та вибраного елемента
    const organizations = useAppSelector(state => state.organizationReducer.items);
    const citizens = useAppSelector(state => state.citizenReducer.items);
    const [inputValue, setInputValue] = useState<string>('');
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (CorrespondentType.INCOMING_ORGANIZATION === correspondentType) {
            setInputValue(organization?.name ?? '');
        }
        if (CorrespondentType.INCOMING_CITIZEN === correspondentType) {
            setInputValue(citizen?.fullName ?? '');
        }
    }, [citizen, organization]);

    // Типізуємо useSelector
    //const { suggestions, loading, error } = useSelector((state: RootState) => state.autocomplete);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    // Використовуємо useCallback для мемоізації функції та типізуємо її
    const debouncedFetchSuggestions = useCallback(
        debounce((query: string) => {

            if (query.length >= 2) {
                if (CorrespondentType.INCOMING_ORGANIZATION === correspondentType) {
                    dispatch(getAllOrganizationByName({searchQuery: query}));
                }
                if (CorrespondentType.INCOMING_CITIZEN === correspondentType) {
                    dispatch(getAllCitizenByFullName({searchQuery: query}));
                }
            } else {
                dispatch(clearOrganizations());
                dispatch(clearCitizens());
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
    const handleSelectOrganization = (suggestion: IOrganization, event: MouseEvent<HTMLLIElement>) => {
        setOrganization(suggestion);
        setInputValue(suggestion.name);
        setSelectedItem(suggestion.name);
    };
    const handleSelectCitizen = (suggestion: ICitizen, event: MouseEvent<HTMLLIElement>) => {
        setCitizen(suggestion);
        setInputValue(suggestion.fullName);
        setSelectedItem(suggestion.fullName);
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

            {CorrespondentType.INCOMING_ORGANIZATION === correspondentType && organizations.length > 0 && !selectedItem && (
                <ul className={css.suggestionsList}>
                    {organizations.map((item, index) => (
                        <li key={index} onClick={(event) => handleSelectOrganization(item, event)}>
                            {item.name}
                        </li>
                    ))}
                </ul>
            )}
            {CorrespondentType.INCOMING_CITIZEN === correspondentType && citizens.length > 0 && !selectedItem && (
                <ul className={css.suggestionsList}>
                    {citizens.map((item, index) => (
                        <li key={index} onClick={(event) => handleSelectCitizen(item, event)}>
                            {item.fullName}
                        </li>
                    ))}
                </ul>
            )
            }
        </div>
    );
};
