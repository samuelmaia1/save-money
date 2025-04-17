'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

import { IoIosMenu } from "react-icons/io";

import style from '@/styles/DropDownMenu.module.scss';
import { useTheme } from '@/hooks/useTheme';

export function DropDownMenu() {

    const { theme } = useTheme();

    const [visible, setVisible] = useState<boolean>(false);

    const menuRef = useRef<HTMLDivElement>(null);

    const handleVisible = () => {
        setVisible((prev) => !prev);
    };

    const closeMenu = () => {
        setVisible(false);
    };

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                closeMenu();
            };
        }

        if (visible) 
            document.addEventListener('mousedown', handleClickOutside);
        else 
            document.removeEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [visible]);

    return (
        <div ref={menuRef} className={style.container}>
            {visible ? 
                <nav className={style.navbar}>
                    <Link href="/">
                        Save<strong className={style.money}>Money</strong>
                    </Link>
                    <Link href="/">Ganhos</Link>
                    <Link href="/">Despesas</Link>
                    <Link href="/">Investimentos</Link>
                    <Link href="/">Relatórios</Link>
                </nav> : 
                <button onClick={handleVisible} className={style.menuButton}>
                    < IoIosMenu size={24}  color={theme === 'dark' ? 'var(--logo-color)' : '#333' }/>
                </button>
            }
        </div>
    )
}