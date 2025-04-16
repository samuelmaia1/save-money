'use client';

import { createContext , ReactNode, useContext, useState, useEffect } from "react";

interface ThemeContextProps {
    toggleTheme: () => void,
    theme: string,
};

interface ThemeProviderProps {
    children: ReactNode
};

const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export function ThemeContextProvider({ children } : ThemeProviderProps) {

    const [theme, setTheme] = useState('');

    useEffect(() => {
        setTheme(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light');
    }, [])

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);

        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => prev === 'light' ? 'dark' : 'light');
    };
    
    return (
        <ThemeContext.Provider value={{toggleTheme, theme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext);
}