import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getRandomColor } from './PieChart';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

export const generateDataset = (data: any[]) => {
    const len = data.map((item) => Object.keys(item))[0].length;
    if (data) {
        try {
            const formatedData = [];

            for (let index = 0; index < len - 2; index++) {
                const obj = {
                    label: data.map((item) => Object.keys(item)[index + 1])[1],
                    data: data.map((item) => Object.values(item)[index + 2]),
                    backgroundColor: getRandomColor(),
                };
                formatedData.push(obj);
            }
            return formatedData;
        } catch (e) {
            console.log(e);
            return [];
        }
    }
};

export default function BarGraph({ data }: { data: any[] }) {
    const options = {
        responsive: true,
        legend: { display: false },
        title: {
            display: false,
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: Object.keys(data[1])[Object.keys(data[1]).length - 1], //last key
                },
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <Bar
            options={options}
            height="400px"
            width="200px"
            data={{
                labels: data.map((item) => Object.values(item)[1]),
                datasets: generateDataset(data),
            }}
        />
    );
}
