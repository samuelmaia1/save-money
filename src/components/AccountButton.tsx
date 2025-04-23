'use client';

import Link from "next/link";

import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

import { IoLogOut } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";

import style from '@/styles/Header.module.scss';
import { useTheme } from "@/hooks/useTheme";

export function AccountButton() {

    const { user } = useContext(UserContext);

    return (
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
            {user ? < LogoutAndConfigButtons /> : <Link className={style.loginButton} href='/login'>Entrar</Link>}
        </div>
    );
};

function LogoutAndConfigButtons() {

    const { logout } = useContext(UserContext);
    const { theme } = useTheme();

    async function handleLogout() {
        await logout();
    }

    return (
        <div style={{display: 'flex', alignItems: 'center', gap: '2rem'}}>
            <Link className={style.accountButton} href='/account'>
                < FaUserAlt size={24} color='var(--logo-color)' />
            </Link>

            <button className={style.logoutButton} onClick={handleLogout}>
                < IoLogOut size={24} color='var(--logo-color)' />
            </button>
        </div>
    );
};