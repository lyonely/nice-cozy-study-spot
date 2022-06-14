import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function CapacityGraph() {
    const options = () => {
        return {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: false,
                },
            },
        }
    }

    const labels = [1, 2, 3, 4]

    const data = () => {
        return {
            labels,
            datasets: [
                {
                    label: 'Dataset 1',
                    data: labels,
                    backgroundColor: 'rgba(100, 100, 100, 100)',
                },
            ],
        }
    }

    return <Bar options={options()} data={data()} />
}
