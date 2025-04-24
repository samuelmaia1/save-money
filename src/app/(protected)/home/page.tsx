import { Dashboard } from '@/components/Dashboard';

import ReactModal from 'react-modal';

import style from './page.module.scss';

export default async function Home() {
    return (
        <div>
            <Dashboard />
        </div>
    )
};