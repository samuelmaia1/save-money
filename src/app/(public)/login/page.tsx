'use client';

import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { UserContext } from '@/context/UserContext';

import { InputField } from '@/components/InputField';
import { LoadingSpinner } from '@/components/LoadingSpinner';

import { MdError } from 'react-icons/md';

import style from './page.module.scss';

export default function Login() {

    const router = useRouter();

    const { login } = useContext(UserContext);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const formSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);
        
        try {
            await login({email, password});
            router.push('/home');
        } catch (error: any) {
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
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
                    Login
                </h1>

                <form onSubmit={formSubmit}>

                    <InputField 
                        value={email}
                        label='Nome de usuário :'
                        name='username'
                        onChange={handleEmail}
                        placeholder='fulano123'
                        type='text'
                    />

                    <InputField 
                        value={password}
                        label='Senha :'
                        name='password'
                        onChange={handlePassword}
                        placeholder='*****'
                        type='password'
                    />

                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '3rem'}}>
                        <button type="submit" className={style.buttonSubmit}>
                            {loading ? <LoadingSpinner width='20px'/> : 'Entrar'}
                        </button>
                    </div>

                </form>

                <p style={{marginTop: '1rem'}}>
                    Ainda não possui conta? <Link href='/register'>Cadastre-se</Link>
                </p>

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

                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Link className={style.registerButton} href='/register'>
                            Cadastre-se
                        </Link>
                    </div>

                </div>

            </div>
        </div>
    )
}