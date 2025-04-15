'use client';

import { ChangeEvent, useState } from 'react';
import Link from 'next/link';

import style from './page.module.scss';
import { InputField } from '@/components/InputField';

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

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

                <form>

                    <InputField 
                        value={username}
                        label='Nome de usuário :'
                        name='username'
                        onChange={handleUsername}
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
                        <button type="submit" className={style.buttonSubmit}>Entrar</button>
                    </div>

                </form>
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