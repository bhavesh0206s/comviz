import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return `${color}80`;
};

export default function PieChart({ data }: { data: any }) {
    const options = {
        responsive: true,
        legend: { display: false },
        title: {
            display: false,
        },

        maintainAspectRatio: false,
    };

    return (
        <Pie
            data={{
                labels: [
                    ...new Set(data.map((item) => Object.values(item)[0])),
                ],
                datasets: [
                    {
                        label: data.map((item) => Object.keys(item)[0])[1],
                        data: data.map((item) => Object.values(item)[1]),
                        backgroundColor: data.map((item) => getRandomColor()),
                    },
                ],
            }}
            options={options}
            height="300px"
            width="300px"
        />
    );
}
