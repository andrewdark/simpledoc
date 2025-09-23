// AutocompleteInput.tsx (перероблено на TS)
import React, { FC, useState, useEffect, useCallback, ChangeEvent, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import css from './AutocompleteInput.module.css';



export const AutocompleteInput:  FC = () => {
    // Типізуємо useState для поля вводу та вибраного елемента
    const [inputValue, setInputValue] = useState<string>('');
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const dispatch = useDispatch();

    // Типізуємо useSelector
    //const { suggestions, loading, error } = useSelector((state: RootState) => state.autocomplete);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    // Використовуємо useCallback для мемоізації функції та типізуємо її
    const debouncedFetchSuggestions = useCallback(
        debounce((query: string) => {
            console.log("q: ", query)
            const arr:string[]=["Abor","Abrok","Abrock", "Ababin", "Abakumov","Ivan","Narkoman"];
            if (query.length >= 2) {
                setSuggestions(arr.filter(el=>el.toLowerCase().includes(query.toLowerCase())));
                //dispatch(fetchSuggestions(query));
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
    const handleSelect = (suggestion: string, event: MouseEvent<HTMLLIElement>) => {
        setInputValue(suggestion);
        setSelectedItem(suggestion);
    };

    return (
        <div className={css.autocompleteContainer}>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Почніть вводити текст..."
                className={css.autocompleteInput}
            />

          {/*{loading && <div className="loading-indicator">Завантаження...</div>}*/}

          {/*  {error && <div className="error-message">Помилка: {error}</div>}*/}

            {suggestions.length > 0 && !selectedItem && (
                <ul className={css.suggestionsList}>
                    {suggestions.map((item, index) => (
                        <li key={index} onClick={(event) => handleSelect(item, event)}>
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
