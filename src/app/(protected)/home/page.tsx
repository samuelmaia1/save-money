import { Summary } from '@/components/Summary';

import { getCurrentUser } from '@/app/lib/auth';
import { Transaction } from '@/interfaces/Transaction';

import style from './page.module.scss';
import { TransactionsTable } from '@/components/TransactionsTable';


export default async function Home() {

    const user = await getCurrentUser();
    const transactions = user?.transactions;

    return (
        <div className={style.container}>
            <h2 className={style.containerTitle}>Olá, {user?.name}</h2>
            <p>Este é seu resumo financeiro.</p>

            < Summary transactions={transactions || []}/>
            < TransactionsTable transactions={transactions || []}/>
        </div>
    );
};