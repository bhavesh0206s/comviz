import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { generateDataset } from './BarGraph';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

export default function LineChart({ data }: { data: any[] }) {
    const options = {
        responsive: true,
        legend: { display: false },
        title: {
            display: false,
        },

        maintainAspectRatio: false,
    };
    return (
        <Line
            data={{
                labels: data.map((item) => Object.values(item)[1]),
                datasets: generateDataset(data),
            }}
            options={options}
            height="300px"
            width="300px"
        />
    );
}
