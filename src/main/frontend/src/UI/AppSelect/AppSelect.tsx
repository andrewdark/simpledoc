import React, {useId} from 'react';
import css from './AppSelect.module.css';

// --- Определение типов ---

/**
 * Интерфейс для одной опции в Select компоненте.
 * Value может быть строкой или числом.
 */
interface SelectOption<T extends string | number> {
    value: T;
    label: string;
}

/**
 * Интерфейс для пропсов Select компонента.
 * Используем дженерик U для типа value, который наследуется от string | number.
 */
interface SelectProps<U extends string | number> {
    options: Array<SelectOption<U>>;
    value: U;
    onChange: (newValue: U) => void;
    label?: string; // Опциональный пропс
    name?: string;  // Опциональный пропс
    id?: string;    // Опциональный пропс
}

// --- Компонент Select ---

/**
 * Контролируемый компонент Select для выбора опции из списка.
 * Тип U определяет тип value для опций и самого select.
 *
 * @param {SelectProps<U>} props - Пропсы компонента.
 */
export function AppSelect<U extends string | number>({options, value, onChange, label, name, id,}: SelectProps<U>) {
    // Используем useId для генерации уникального ID, если он не передан
    const generatedId = useId();
    const selectId = id || generatedId;

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // TypeScript теперь знает, что event.target.value - это строка.
        // Мы должны привести ее к типу U, предполагая, что наши значения
        // всегда будут либо строками, либо числами, и мы корректно обрабатываем их.
        // Если U это number, то event.target.value нужно будет преобразовать в число.
        const newValue: U = event.target.value as U;
        onChange(newValue);
    };

    return (
        <div className={css.appSelect}>
            {label && (<label htmlFor={selectId} className={css.appSelectLabel}>{label}</label>)}
            <select
                id={selectId}
                name={name}
                value={value} // Текущее выбранное значение из пропсов
                onChange={handleChange} // Обработчик изменения
                className={css.appSelectComponent}
            >
                {/* Опция по умолчанию, если нужно. Например, "Выберите..." */}
                <option value="" disabled>
                    -- Виберіть опцію --
                </option>
                {options.map((option) => (
                    <option key={String(option.value)} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
