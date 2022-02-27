import axios from 'axios';
import dynamic from 'next/dynamic';
import { ChangeEvent, useState } from 'react';
import DataTable from 'src/components/DataTable';
import Layout from 'src/components/Layout';
import { Loader } from 'src/components/Loading';

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

export const graphType = (data: { [key: string]: string[] | number[] }) => {
    if (data) {
        const columns = Object.keys(data);
        const colLen = columns.length;
        if (colLen === 2) {
            return ['Bar Chart', 'Line Chart', 'Pie Chart'];
        } else {
            return ['Bar Chart', 'Line Chart'];
        }
    } else {
        return ['Bar Chart', 'Line Chart', 'Pie Chart'];
    }
};

export const formatData = (data: any) => {
    try {
        const columns = Object.keys(data);
        const rows = Object.values(data);
        const formatedData = [];
        for (let index = 0; index < data[columns[0]].length; index++) {
            const obj = {};
            rows.forEach((item, i) => {
                obj[columns[i]] = data[columns[i]][index];
            });
            formatedData.push(obj);
        }
        console.log(formatedData);
        return formatedData;
    } catch (e) {
        return [];
    }
};

export default function Queries() {
    const [editorValue, setEditorValue] = useState('');
    const [query, setQuery] = useState('');
    const [isValidQuery, setIsValidQuery] = useState(false);
    const [selectedChart, setSelectedChart] = useState('Bar Chart');
    const [activeTab, setActiveTab] = useState('chart');
    const [isFetching, setIsFetching] = useState(false);
    const [data, setData] = useState();

    const onQuerySubmit = async () => {
        setIsFetching(true);
        try {
            const res = await axios.get(
                `/api/db?query=${editorValue.replaceAll(';', ' ')}`,
            );
            console.log(res.data);
            setData(res.data.data);
            setIsValidQuery(true);
        } catch (error) {}
        setIsFetching(false);
    };

    const handleChartChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedChart(event.target.value);
    };

    const onSave = () => {
        console.log('save');
    };

    // const data = {
    //     brand: [
    //         'Xiaomi',
    //         'Samsung',
    //         'Vivo',
    //         'Oppo',
    //         'Realme',
    //         'Apple',
    //         'Motorola',
    //         'OnePlus',
    //         'Lenovo',
    //         'Huawei',
    //         'Other',
    //     ],
    //     count: [
    //         16416511, 12943051, 8365074, 8365074, 3165738, 2326897, 2099718,
    //         1890141, 1627153, 1104740, 7462707,
    //     ],
    //     // users: [45656, 13212, 78979, 99999],
    // };

    const renderChart = () => {
        if (data) {
            switch (selectedChart) {
                case 'Bar Chart':
                    return <BarGraph data={formatData(data)} />;
                case 'Pie Chart':
                    return <PieChart data={formatData(data)} />;
                case 'Line Chart':
                    return <LineChart data={formatData(data)} />;
            }
        } else {
            return null;
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
                        {graphType(data).map((item, i) => (
                            <option key={item} selected={i === 0}>
                                {item}
                            </option>
                        ))}
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
                        {isFetching ? (
                            <Loader color="text-white" />
                        ) : (
                            <p>
                                Write your SQL query above and then click Run
                                query. The results from your query will show up
                                here.
                            </p>
                        )}
                    </div>
                )}
            </Layout>
        </>
    );
}
