import dynamic from 'next/dynamic';
import { useState } from 'react';
import Layout from 'src/components/Layout';

const SqlEditor = dynamic(() => import('src/components/SqlEditor'), {
    ssr: false,
});

const BarGraph = dynamic(() => import('src/components/graphs/BarGraph'), {
    ssr: false,
});

export default function Queries() {
    const [editorValue, setEditorValue] = useState('');
    const [query, setQuery] = useState('');
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
    return (
        <Layout>
            <SqlEditor
                setQuery={setQuery}
                setValue={setEditorValue}
                value={editorValue}
            />
            <BarGraph indexBy="day" data={data} />
        </Layout>
    );
}
