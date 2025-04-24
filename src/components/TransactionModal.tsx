import { ChangeEvent, FormEvent, useContext, useState } from "react";
import ReactModal from "react-modal";


import { InputField } from "./InputField";

import { IoMdClose } from "react-icons/io";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";

import style from '@/styles/Modal.module.scss';
import { UserContext } from "@/context/UserContext";

interface TransactionModalProps {
    isOpen: boolean,
    onRequestClose: () => void
}

export function TransactionModal({isOpen, onRequestClose} : TransactionModalProps) {

    const { user } = useContext(UserContext);

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [type, setType] = useState<string>('income');
    const [value, setValue] = useState<number>(0);
    const [category, setCategory] = useState<string>('');

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

    const formSubmit = async (e: FormEvent) => {
        
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

                <form>
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
                    
                    <SelectCategory type={type} category={category} handleChange={handleCategory}/>

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
                    <option value="Mercado e Padaria">Despesas</option>
                    <option value="Compras">Compras</option>
                    <option value="Lazer">Lazer</option>
                    <option value="Despesas">Despesas</option>
                </select>
            }
        </div>
    )
}