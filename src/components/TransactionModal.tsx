import { ChangeEvent, FormEvent, useContext, useState } from "react";
import ReactModal from "react-modal";

import { InputField } from "./InputField";

import { IoMdClose } from "react-icons/io";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { MdError } from "react-icons/md";

import style from '@/styles/Modal.module.scss';
import { UserContext } from "@/context/UserContext";
import { Transaction } from "@/interfaces/Transaction";
import { api } from "@/services/api";

interface TransactionModalProps {
    isOpen: boolean,
    onRequestClose: () => void,
    addTransaction: (transaction: Transaction) => void
}

export function TransactionModal({isOpen, onRequestClose, addTransaction} : TransactionModalProps) {

    const { user } = useContext(UserContext);
    const userId = user?.id;

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [type, setType] = useState<string>('income');
    const [value, setValue] = useState<number>(0);
    const [category, setCategory] = useState<string>('');
    const [source, setSource] = useState<string>('');
    const [receiver, setReceiver] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const handleDescription = (e: ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    }

    const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value);
    }

    const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(Number(e.target.value));
    }

    const handleSource = (e: ChangeEvent<HTMLInputElement>) => {
        setSource(e.target.value);
    }

    const handleReceiver = (e: ChangeEvent<HTMLInputElement>) => {
        setReceiver(e.target.value);
    }

    const formSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const newTransaction: Transaction = {
            title, 
            type, 
            category, 
            value, 
            description, 
            date: new Date().toLocaleDateString(),
            source,
            receiver
        };

        console.log(newTransaction);

        try {
            const response = await api.post(`/transaction/${userId}`, newTransaction, {
                validateStatus: (status) => true
            });

            if (response.status === 400)
                throw new Error(response.data.message);

            if (response.status === 201)
                addTransaction(newTransaction);

            setValue(0);
            setCategory('');
            setDescription('');
            setReceiver('');
            setSource('');
            setTitle('');
            setType('');
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    }

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName={style.reactModalOverlay}
            className={style.reactModalContent}
        >
            <button 
                type="button"
                onClick={onRequestClose}
                className={style.buttonClose}
            >
                < IoMdClose size={24} color='#faffff'/>
            </button>

            <div className={style.container}>
                <h2>Cadastrar nova transação</h2>

                <form onSubmit={formSubmit}>
                    <InputField 
                        name="title"
                        label="Título"
                        placeholder="Compras do mês"
                        type="text"
                        onChange={handleTitle}
                        value={title}
                    />

                    <InputField 
                        name="description"
                        label="Descrição"
                        placeholder="Compras no supermercado"
                        type="text"
                        onChange={handleDescription}
                        value={description}
                    />

                    <InputField 
                        name="value"
                        label="Valor"
                        placeholder="1.500"
                        type="number"
                        onChange={handleValue}
                        value={value.toString()}
                    />  

                    <div className={style.transactionTypeContainer}>
                        <button
                            type='button'
                            style={{
                                background: type === 'income' ? '#223129' : 'transparent',
                                color: type === 'income' ? '#ffffff' : 'var(--text-title)',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                            onClick={() => setType('income')}
                        >
                            < FaArrowAltCircleUp color='#6DD868' size={18}/>
                            <span>Entrada</span>
                            
                        </button>

                        <button
                            type='button'
                            style={{
                                background: type === 'expense' ? '#352528' : 'transparent',
                                color: type === 'expense' ? '#ffffff' : 'var(--text-title)',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                            onClick={() => setType('expense')}
                        >
                            < FaArrowAltCircleDown color='#E52E4D' size={18} />
                            <span>Saída</span>
                        </button>
                    </div>

                    {
                        type == 'income' ? 
                        <InputField 
                            name="source"
                            label="Fonte"
                            placeholder="Freelancer para cliente"
                            type="text"
                            onChange={handleSource}
                            value={source}
                        /> :
                        <InputField 
                            name="receiver"
                            label="Destino"
                            placeholder="Padaria"
                            type="text"
                            onChange={handleReceiver}
                            value={receiver}
                        /> 
                    }
                    
                    <SelectCategory type={type} category={category} handleChange={handleCategory}/>

                    <div className={style.buttonSubmitContainer}>
                        <button type="submit" className={style.buttonSubmit}>Criar transação</button>
                    </div>

                    {errorMessage && <p className={style.errorMessage}> <MdError /> {errorMessage}</p>}
                </form>
            </div>
        </ReactModal>
    )
}

interface SelectCategoryProps {
    type: string,
    category: string,
    handleChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

function SelectCategory({type, category, handleChange}: SelectCategoryProps) {
    return (
        <div>
            <label htmlFor="category">Categoria</label>
            {type == 'income' ? 
                <select id="category" value={category} onChange={handleChange} className={style.selectCategory}>
                    <option value="">Selecione</option>
                    <option value="Salário">Salário</option>
                    <option value="Freelancer">Freelancer</option>
                    <option value="Venda">Venda</option>
                </select>
                :
                <select id="category" value={category} onChange={handleChange} className={style.selectCategory}>
                    <option value="">Selecione</option>
                    <option value="Mercado e Padaria">Mercado e padaria</option>
                    <option value="Compras">Compras</option>
                    <option value="Lazer">Lazer</option>
                    <option value="Despesas">Despesas</option>
                    <option value="Gastos pontuais">Gastos pontuais</option>
                </select>
            }
        </div>
    )
}