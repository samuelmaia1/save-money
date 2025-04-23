'use client';

interface SummaryProps {
    transactions: Transaction[]
}

import { useEffect, useState } from 'react';

import { Transaction } from '@/interfaces/Transaction';

import style from '@/styles/Summary.module.scss';
import { formatNumber } from '@/services/format';

export function Summary({transactions} : SummaryProps) {

    const [incomes, setIncomes] = useState<number>(0);
    const [expenses, setExpenses] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        let sumIncomes = 0;
        let sumExpenses = 0;
        let sumTotal = 0;

        transactions.forEach((transaction) => {
            if (transaction.type === 'income') {
                sumIncomes += transaction.value;
                sumTotal += transaction.value;
            }
            else {
                sumExpenses += transaction.value;
                sumTotal -= transaction.value;
            }
        });

        setIncomes(sumIncomes);
        setExpenses(sumExpenses);
        setTotal(sumTotal);

    }, [transactions])

    return (
        <div className={style.container}>
            <div className={`${style.shape} ${style.incomeShape}`}>
                <h2>Entradas</h2>
                <p>R$ {formatNumber(incomes)}</p>
            </div>

            <div className={`${style.shape} ${style.outcomeShape}`} >
                <h2>Saídas</h2>
                <p>- R$ {formatNumber(expenses)}</p>
            </div>

            <div className={`${style.shape} ${style.totalShape}`} >
                <h2>Total</h2>
                <p>{incomes >= expenses ? `R$ ${formatNumber(total)}` : `- R$ ${formatNumber(-1 * total)}`}</p>
            </div>
        </div>
    )
}