'use client';

import { createContext, ReactNode, useEffect, useState } from "react";

import { logout as serverLogout, login as serverLogin, getCurrentUser } from "@/app/lib/auth";
import { User } from "@/interfaces/User";
import { Login } from "@/interfaces/Login";
import { useRouter } from "next/navigation";

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
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {

        async function loadSession() {

            const userResponse = await getCurrentUser();
            
            setUser(userResponse);
        };

        loadSession();

    }, []);

    async function logout(): Promise<void> {
        setUser(null);
        await serverLogout();
        router.push('/login')
    }

    async function login({email, password}: Login): Promise<void> {
        try {
            const userLogin = await serverLogin({email, password});
            setUser(userLogin);
        } catch (error) {
            throw error;
        }
    }


    return (
        <UserContext.Provider value={{user, logout, login}}>
            {children}
        </UserContext.Provider>
    )
}