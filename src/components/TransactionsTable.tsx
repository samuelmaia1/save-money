'use client';

import { useTheme } from "@/hooks/useTheme";
import { Transaction } from "@/interfaces/Transaction";
import { formatNumber } from "@/services/format";

import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";

import style from '@/styles/TransactionsTable.module.scss';

interface TransactionsTableProps {
    transactions: Transaction[]
};

export function TransactionsTable({transactions} : TransactionsTableProps) {

    const { theme } = useTheme();

    return (
        <table className={style.table}>
            <thead style={{color: theme == 'dark' ? '#bfbfbf' : '#333333'}}>
                <tr>
                    <th>Título</th>
                    <th>Valor</th>
                    <th>Categoria</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody>
                {transactions && transactions.map((transaction) => {
                    return (
                        <TableRow transaction={transaction} key={transaction.id}/>
                    )
                })}
        
            </tbody>
        </table>
    )
}

interface TableRowProps{
    transaction: Transaction
}

function TableRow({transaction}: TableRowProps) {

    return (
        <>
            <tr>
                <td style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
                    {transaction.type == 'income' ? < FaArrowAltCircleUp color="#6DD868" /> : < FaArrowAltCircleDown color="#E52E4D"/> }
                    {transaction.title}
                </td>
                <td>
                    R$ {formatNumber(transaction.value)}
                </td>
                <td>{transaction.category}</td>
                <td>{transaction.date.toString()}</td>
            </tr>
        </>
    )
}