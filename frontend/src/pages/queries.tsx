import dynamic from 'next/dynamic';
import { ChangeEvent, useState } from 'react';
import DataTable from 'src/components/DataTable';
import Layout from 'src/components/Layout';

const SqlEditor = dynamic(() => import('src/components/SqlEditor'), {
    ssr: false,
});

const BarGraph = dynamic(() => import('src/components/graphs/BarGraph'), {
    ssr: false,
});

const PieChart = dynamic(() => import('src/components/graphs/PieChart'), {
    ssr: false,
});

const LineChart = dynamic(() => import('src/components/graphs/LineChart'), {
    ssr: false,
});

export default function Queries() {
    const [editorValue, setEditorValue] = useState('');
    const [query, setQuery] = useState('');
    const [isValidQuery, setIsValidQuery] = useState(false);
    const [selectedChart, setSelectedChart] = useState('Bar Chart');
    const [activeTab, setActiveTab] = useState('chart');

    const onQuerySubmit = () => {
        console.log(query);
        setIsValidQuery(true);
    };

    const handleChartChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedChart(event.target.value);
    };

    const onSave = () => {
        console.log('save');
    };

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

    const renderChart = () => {
        switch (selectedChart) {
            case 'Bar Chart':
                return <BarGraph data={data} />;
            case 'Pie Chart':
                return <PieChart data={data} />;
            case 'Line Chart':
                return <LineChart data={data} />;
        }
    };

    return (
        <>
            <Layout>
                <SqlEditor
                    setValue={setEditorValue}
                    value={editorValue}
                    onSubmit={onQuerySubmit}
                />
                <div className="mb-5 flex flex-row justify-between">
                    <select
                        onChange={handleChartChange}
                        className="select w-full max-w-xs select-bordered"
                    >
                        <option selected>Bar Chart</option>
                        <option>Line Chart</option>
                        <option>Pie Chart</option>
                    </select>
                    <button onClick={onSave} className="btn ">
                        Save
                    </button>
                </div>
                <div className="tabs tabs-boxed">
                    <div onClick={() => setActiveTab('chart')}>
                        <a
                            className={`tab ${
                                activeTab === 'chart' ? 'tab-active' : ''
                            }`}
                        >
                            Chart
                        </a>
                    </div>
                    <div onClick={() => setActiveTab('data')}>
                        <a
                            className={`tab ${
                                activeTab === 'data' ? 'tab-active' : ''
                            }`}
                        >
                            Data
                        </a>
                    </div>
                </div>

                {isValidQuery ? (
                    <>
                        {activeTab === 'chart' ? (
                            <div className="bg-gray-100 p-10">
                                {renderChart()}
                            </div>
                        ) : (
                            <DataTable data={data} />
                        )}
                    </>
                ) : (
                    <div className="bg-gray-500 rounded-lg flex flex-col justify-center items-center p-5">
                        <p>
                            Write your SQL query above and then click Run query.
                            The results from your query will show up here.
                        </p>
                    </div>
                )}
            </Layout>
        </>
    );
}
function setActiveTab(arg0: string): void {
    throw new Error('Function not implemented.');
}
