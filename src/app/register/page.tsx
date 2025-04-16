'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import { InputField } from '@/components/InputField';
import { LoadingSpinner } from '@/components/LoadingSpinner';

import { MdError } from 'react-icons/md';

import style from './page.module.scss';
import { CreateUser } from '@/interfaces/User';
import { api } from '@/services/api';

export default function Register() {
    const router = useRouter();

    const [name, setName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [cpf, setCpf] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLastName = (e: ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    };

    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleCpf = (e: ChangeEvent<HTMLInputElement>) => {
        setCpf(e.target.value);
    };

    const formSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await createUser({name, lastName, cpf, email, password});
            alert('Usuário criado com sucesso! Você será redirecionado para o login');
            setTimeout(() => {
                router.push('/login');
            }, 1000);
        } catch (error: any) {
            console.log(error.message);
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        } 
    }

    const createUser = async (data: CreateUser) => {
        const response = await api.post('/users/register', data, {
            validateStatus: (status) => true
        });

        if (response.status === 201) {
            
        } else {
            throw new Error(response.data);
        }
    }

    return (
        <div className={style.container}>

            <div className={style.formContainer}>
                <h1 
                    style={{
                        textAlign: 'center',
                        marginBottom: '4rem'
                    }}
                >
                    Cadastre-se
                </h1>

                <form onSubmit={formSubmit}>

                    <InputField 
                        value={name}
                        label='Nome'
                        name='name'
                        onChange={handleName}
                        placeholder='fulano123'
                        type='text'
                    />

                    <InputField 
                        value={lastName}
                        label='Sobrenome'
                        name='lastName'
                        onChange={handleLastName}
                        placeholder='da Silva'
                        type='text'
                    />      

                    <InputField 
                        value={email}
                        label='E-mail'
                        name='email'
                        onChange={handleEmail}
                        placeholder='fulano@gmail.com'
                        type='email'
                    />

                    <InputField 
                        value={cpf}
                        label='CPF (Apenas números)'
                        name='cpf'
                        onChange={handleCpf}
                        placeholder=''
                        type='text'
                        length={11}
                    />

                    <InputField 
                        value={password}
                        label='Senha'
                        name='password'
                        onChange={handlePassword}
                        placeholder='*****'
                        type='password'
                    />

                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '3rem'}}>
                        <button type="submit" className={style.buttonSubmit}>
                            {loading ? <LoadingSpinner width='20px'/> : 'Cadastre-se'}
                        </button>
                    </div>

                </form>

                {errorMessage && <p className={style.errorMessage}> <MdError /> {errorMessage}</p>}
            </div>

            <Card />
        </div>
    )

}

function Card() {
    return (
        <div className={style.card}>
            <div className={style.cardTitles}>

                <div style={{textAlign: 'center', marginBottom: '3rem'}}>
                    <h1 
                        style={{marginBottom: '0', fontWeight: 'bold'}}>
                        Junte-se a nós!
                    </h1>

                    <p 
                        style={{
                            marginTop: '0'
                        }}
                    >
                        Reúna todas suas finanças em um só lugar!

                    </p>
                </div>

                <ul style={{margin: '0'}}>
                    <li>Gráficos de investimentos</li>
                    <li>Relatórios de gastos</li>
                    <li>Controle de finanças</li>
                    <li>Controle de vencimentos</li>
                </ul>

                <div style={{marginTop: '1.5rem'}}>

                    De <span style={{margin: 0}}> R$ 49,99</span>

                    <p 
                        style={{
                            fontWeight: 'bold', 
                            marginTop: '0', 
                            fontSize: '2rem'
                        }}
                    >
                            Por R$ 29,99
                    </p>

                </div>

            </div>
        </div>
    )
}