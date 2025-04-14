'use client';

import { createContext, ReactNode, useContext } from "react";

interface ColorsContextProps {
    children: ReactNode
};

interface ColorsProviderValue {
    colors: string[]
};

const ColorsContext = createContext<ColorsProviderValue>({} as ColorsProviderValue);

export function ColorsContextProvider({children}: ColorsContextProps) {

    const colors: string[] = [
        '#4BC0C099',
        '#ABF6A6',
        '#9E6DC8',
    ];

    return (
        <ColorsContext.Provider value={{colors}}>
            {children}
        </ColorsContext.Provider>
    );
}

export function useColors() {
    return useContext(ColorsContext);
} 