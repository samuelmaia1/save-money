'use client';

import { Login } from '@/interfaces/Login';
import { api } from '@/services/api';
import { useState , useEffect , createContext, ReactNode } from 'react'

interface LoginProviderValues {
    isLogged: boolean,
    logout: () => void,
    login: (data: Login) => Promise<void>
};

interface LoginProviderProps {
    children: ReactNode
};

export const LoginContext = createContext<LoginProviderValues>({} as LoginProviderValues)

export function LoginContextProvider({children} : LoginProviderProps) {

    const [isLogged, setIsLogged] = useState<boolean>(false);

    useEffect(() => {
        setIsLogged(() => localStorage.getItem('user') !== null);
    }, [])

    const logout = () => {
        localStorage.removeItem('user');
        setIsLogged(false);
    };

    const login = async (data: Login) : Promise<void> => {
        const response = await api.post('/users/login', data, {
            validateStatus: (status) => true
        });
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(data));
            setIsLogged(true);
        } else {
            throw new Error('Login ou senha inválidos.');
        }
    };

    return (
        <LoginContext.Provider value={{isLogged, login, logout}}>
            {children}
        </LoginContext.Provider>
    )
}