'use client';

import { useContext, useEffect, useState } from 'react';

import { Summary } from '@/components/Summary';
import { TransactionsTable } from './TransactionsTable';

import { UserContext } from '@/context/UserContext';

import style from '@/styles/Dashboard.module.scss';
import { TransactionModal } from './TransactionModal';
import { Transaction } from '@/interfaces/Transaction';

export function Dashboard() {

    const { user } = useContext(UserContext);

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        if (user)
            setTransactions(user.transactions);
    }, [user])

    const addTransaction = (transaction: Transaction) => {setTransactions((prev) => {return [...transactions, transaction]})};

    const [isOpen, setIsopen] = useState<boolean>(false);

    const handleCloseModal = () => setIsopen(false);

    const handleOpenModal = () => setIsopen(true);

    return (
        <div className={style.container}>
            <div className={style.titleContainer}>
                <div>
                    <h2 className={style.containerTitle}>Olá, {user?.name}</h2>
                    <p>Este é seu resumo financeiro.</p>
                </div>

                <button className={style.newTransactionButton} onClick={handleOpenModal}>Nova transação</button>
            </div>

            < Summary transactions={transactions || []}/>
            < TransactionsTable transactions={transactions || []}/>
            < TransactionModal isOpen={isOpen} onRequestClose={handleCloseModal} addTransaction={addTransaction}/>
        </div>
    );
}