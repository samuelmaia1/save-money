import { Summary } from '@/components/Summary';

import { getSession } from '@/app/lib/auth';

import style from './page.module.scss';
import { Transaction } from '@/interfaces/Transaction';


export default async function Home() {

    const user = await getSession();
    const transactions = user?.transactions;

    return (
        <div className={style.container}>
            < Summary transactions={transactions || []}/>
        </div>
    );
};