'use client';

import { createContext, ReactNode, useEffect, useState } from "react";

import { getSession, logout as serverLogout, login as serverLogin } from "@/app/lib/auth";
import { User } from "@/interfaces/User";
import { Login } from "@/interfaces/Login";

interface UserProviderValues {
    user: User | null,
    logout: () => Promise<void>,
    login: (data: Login) => Promise<void>
}

interface UserProviderProps {
    children: ReactNode;
}

export const UserContext = createContext<UserProviderValues>({} as UserProviderValues);

export function UserContextProvider({children} : UserProviderProps) {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {

        async function loadSession() {
            const user = await getSession(); 
            setUser(user);
        };

        loadSession();

    }, []);

    async function logout(): Promise<void> {
        setUser(null);
        await serverLogout();
    }

    async function login({email, password}: Login): Promise<void> {
        try {
            const userLogin = await serverLogin({email, password});
            setUser(userLogin);
        } catch (error) {
            throw error;1
        }
    }


    return (
        <UserContext.Provider value={{user, logout, login}}>
            {children}
        </UserContext.Provider>
    )
}