'use server';

import { Login } from "@/interfaces/Login";
import { User } from "@/interfaces/User";
import { api } from "@/services/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface LoginResponse {
    success: boolean,
    token: string,
    user: User
};

export async function login({ email, password } : Login) {
    const response = await api.post('/auth/login', {email, password});

    if (response.status === 401) {
        throw new Error("Senha inválida")
    } else if (response.status === 404) {
        throw new Error("Usuário com este e-mail já cadastrado");
    }

    const { user, token }: LoginResponse = response.data;
    const cookieStore = await cookies();

    cookieStore.set('user', JSON.stringify(user), {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
    });

    cookieStore.set('token', token, { 
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 semana
        path: '/',
    });

    return user;
};

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('user');
    cookieStore.delete('token');
    redirect('/login');
};

export async function getSession(): Promise<User | null> {
    const userCookie = (await cookies()).get('user')?.value;

    if (userCookie){
        const user = JSON.parse(userCookie);
        return user;
    }

    return null;
};

export async function getToken() {
    return (await cookies()).get('token')?.value;
};