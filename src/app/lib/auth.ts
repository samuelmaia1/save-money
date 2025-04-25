'use server';

import { cache } from "react";
import { Login } from "@/interfaces/Login";
import { User } from "@/interfaces/User";
import { api } from "@/services/api";
import { AxiosError } from "axios";
import { cookies } from "next/headers";

interface LoginResponse {
    success: boolean,
    token: string,
    user: User
};

export async function login({ email, password } : Login) {
    const response = await api.post('/auth/login', {email, password}, {
        validateStatus: (status) => true
    });
    
    if (response.status === 401) {
        throw new Error("Senha inválida");
    } else if (response.status === 404) {
        throw new Error("Usuário com este e-mail não existe");
    } else if (response.status >= 500) {
        throw new Error("Erro interno do servidor. Por favor, tente mais tarde.");
    };

    const { user, token }: LoginResponse = response.data;
    const cookieStore = await cookies();

    cookieStore.set('token', token, { 
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
    });

    return user;
};

const getCachedUser = cache(async (token: string | undefined) => {
    if (!token) return null;

    try {
        const response = await api.get('/auth/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    
        return response.data as User;
    } catch (error) {

        const responseError = error as AxiosError;

        if (responseError.response?.status === 401) {
            await logout();
        }
        return null;
    };
})

export async function getCurrentUser() {
    const token = await getToken();

    return getCachedUser(token);
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('token');
};

const getCachedToken = cache(async () => {
    return (await cookies()).get('token')?.value;
})

export async function getToken() {
    return getCachedToken();
};