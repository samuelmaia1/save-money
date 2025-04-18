import { ChangeEvent } from 'react';
import style from '@/styles/InputField.module.scss';
import { useTheme } from '@/hooks/useTheme';

interface InputFieldProps {
    label: string,
    name: string,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string,
    placeholder?: string,
    required?: boolean,
    disabled?: boolean,
    className?: string,
    length?: number,
    checked?: boolean
};

export function InputField({
    label, 
    name, 
    value, 
    onChange, 
    type, 
    placeholder, 
    required, 
    disabled, 
    className,
    length,
    checked
} : InputFieldProps) {

    const { theme } = useTheme()

    return (
        <div className={style.containerInputForm}>
            <label htmlFor={name}>{label}</label>
            <input 
                type={type}
                className={`${style.inputForm}  ${theme === 'light' && style.lightInput}`} 
                onChange={onChange} 
                value={value}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                maxLength={length}
                checked={checked}
            />
        </div>
    )
}