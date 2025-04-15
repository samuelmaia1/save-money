'use client';

import { useColors } from "@/hooks/useColors";

import { ChartItem } from "@/interfaces/Chart";

import { Doughnut } from 'react-chartjs-2';

import style from '@/styles/DoughnutChart.module.scss'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    Title,
    ArcElement,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    ArcElement,
    Tooltip,
    Legend
);

interface DoughnutChartProps{
    data: ChartItem[],
    label: string,
    title: string
};

export function DoughnutChart({data, label, title}: DoughnutChartProps) {

    const { colors } = useColors();

    const labels = data.map((item) => item.title);
    const values = data.map((item) => item.value);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: label,
                data: values,
                backgroundColor: colors,
                borderWidth: 1,
                borderColor: colors,
            }
        ]
    };

    const chartOptions: ChartOptions<'doughnut'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: title,
            },
        },
    };

    return <div className={style.container}>
        < Doughnut data={chartData} options={chartOptions} />
    </div>
};