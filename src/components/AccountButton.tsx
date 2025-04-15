'use client';

import Link from "next/link";

import style from '@/styles/Header.module.scss';
import { useContext } from "react";
import { LoginContext } from "@/context/LoginContext";

export function AccountButton() {

    const {isLogged} = useContext(LoginContext);

    return (
        <Link className={style.loginButton} href='/login'>
            {isLogged ? 'Conta' : 'Entrar'}
        </Link>
    )
}