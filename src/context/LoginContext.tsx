'use client';

import { Login } from '@/interfaces/Login';
import { api } from '@/services/api';
import { useState , useEffect , createContext, ReactNode } from 'react'

interface LoginProviderValues {
    isLogged: boolean,
    logout: () => void,
    login: (data: Login) => Promise<boolean>
};

interface LoginProviderProps {
    children: ReactNode
};

export const LoginContext = createContext<LoginProviderValues>({} as LoginProviderValues)

export function LoginContextProvider({children} : LoginProviderProps) {

    const [isLogged, setIsLogged] = useState<boolean>(() => {return localStorage.getItem('user') ? true : false});

    const logout = () => {
        localStorage.removeItem('user');
        setIsLogged(false);
    };

    const login = async (data: Login) : Promise<boolean> => {
        const response = await api.post('/users/login', data);
        setIsLogged(response.data);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(data));
            return true;
        }
        return false;
    };

    return (
        <LoginContext.Provider value={{isLogged, login, logout}}>
            {children}
        </LoginContext.Provider>
    )
}