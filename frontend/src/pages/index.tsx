import dynamic from 'next/dynamic';
import { useState } from 'react';
import PhoneAuthModal from 'src/components/modal/PhoneAuthModal';

import styles from 'src/styles/Home.module.css';

const SqlEditor = dynamic(() => import('src/components/SqlEditor'), {
    ssr: false,
});

const BarGraph = dynamic(() => import('src/components/graphs/BarGraph'), {
    ssr: false,
});

export default function Home() {
    const data = [
        {
            day: 'Monday',
            degress: 59,
        },
        {
            day: 'Tuesday',
            degress: 61,
        },
        {
            day: 'Wednesday',
            degress: 55,
        },
        {
            day: 'Thursday',
            degress: 78,
        },
        {
            day: 'Friday',
            degress: 71,
        },
        {
            day: 'Saturday',
            degress: 56,
        },
        {
            day: 'Sunday',
            degress: 67,
        },
    ];
    const [editorValue, setEditorValue] = useState('');
    const [query, setQuery] = useState('');
    const [openPhoneAuthModal, setOpenPhoneAuthModal] = useState(false);
    return (
        <div className={styles.container}>
            <PhoneAuthModal
                isOpen={openPhoneAuthModal}
                setIsOpen={setOpenPhoneAuthModal}
            />
            <h1 className="text-6xl font-bold">Comviz</h1>
            <button onClick={() => setOpenPhoneAuthModal(true)} className="btn">
                Open Phone Auth
            </button>
            <SqlEditor
                setQuery={setQuery}
                setValue={setEditorValue}
                value={editorValue}
            />
            <BarGraph data={data} />
        </div>
    );
}
