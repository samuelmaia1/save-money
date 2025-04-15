import Link from "next/link";

import style from '@/styles/Header.module.scss';
import { LightModeButton } from "./LightModeButton";
import { AccountButton } from "./AccountButton";

export function Header() {
    
    return (
        <header className={style.header}>
            <div className={style.containerNavbar}>
                <Link href="/">
                    Save<strong className={style.money}>Money</strong>
                </Link>

                <nav className={style.navbar}>
                    <Link href="/">Ganhos</Link>
                    <Link href="/">Despesas</Link>
                    <Link href="/">Investimentos</Link>
                    <Link href="/">Relatórios</Link>
                </nav>
            </div>

            <div className={style.accountNav}>
                
                <LightModeButton />

                <AccountButton />
            </div>
        </header>
    )
}