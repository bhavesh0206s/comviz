import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import DataTable from 'src/components/DataTable';
import Layout from 'src/components/Layout';
import { DashboardInterface } from 'src/types';
import { getDashboard } from 'src/utils/storage';
import { formatData, graphType } from '../queries';

const BarGraph = dynamic(() => import('src/components/graphs/BarGraph'), {
    ssr: false,
});

const PieChart = dynamic(() => import('src/components/graphs/PieChart'), {
    ssr: false,
});

const LineChart = dynamic(() => import('src/components/graphs/LineChart'), {
    ssr: false,
});

export default function DashboardId() {
    const router = useRouter();
    const [selectedChart, setSelectedChart] = useState('Bar Chart');
    const [activeTab, setActiveTab] = useState('chart');

    const [dashboard, setDashboard] = useState<DashboardInterface>();

    const handleChartChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedChart(event.target.value);
    };

    useEffect(() => {
        if (router.isReady) {
            const data = getDashboard(router.query.id);
            setDashboard(data);
        }
    }, [router]);

    const renderChart = () => {
        if (dashboard?.data) {
            switch (selectedChart) {
                case 'Bar Chart':
                    return <BarGraph data={formatData(dashboard?.data)} />;
                case 'Pie Chart':
                    return <PieChart data={formatData(dashboard?.data)} />;
                case 'Line Chart':
                    return <LineChart data={formatData(dashboard?.data)} />;
            }
        } else {
            return null;
        }
    };
    return (
        <Layout>
            <div className="py-5">
                <p className="text-4xl font-bold pb-1">{dashboard?.title}</p>
                <p className="text-base text-gray-300">
                    Create by: @{dashboard?.username}
                </p>
                <div className="mb-5 mt-4 flex flex-row justify-between">
                    <select
                        onChange={handleChartChange}
                        className="select w-full max-w-xs select-bordered"
                    >
                        {graphType(dashboard?.data).map((item, i) => (
                            <option key={item} selected={i === 0}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="tabs tabs-boxed ">
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
                {activeTab === 'chart' ? (
                    <div className="bg-gray-100 p-10">{renderChart()}</div>
                ) : (
                    <DataTable data={dashboard?.data} />
                )}
            </div>
        </Layout>
    );
}
