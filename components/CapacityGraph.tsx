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
    const outlineColor = () => {
        return 'rgba(0, 0, 0, 255)'
    }

    const barColor = () => {
        return 'rgba(175, 175, 175, 255)'
    }

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
            scales: {
                yAxis: {
                    display: false,
                },
                xAxis: {
                    display: true,
                    grid: {
                        drawTicks: false,
                        drawOnChartArea: false,
                        drawBorder: true,
                        borderWidth: 1,
                        borderColor: outlineColor(),
                    },
                    ticks: {
                        maxTicksLimit: 6,
                        maxRotation: 0,
                        font: {
                            family: "'DM Sans'",
                            size: 16,
                        },
                        callback: function (value, index, ticks) {
                            return `${this.getLabelForValue(value)}:00`
                        },
                    },
                },
            },
        }
    }

    const labels = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]

    const data = () => {
        return {
            labels,
            datasets: [
                {
                    label: 'Capacity',
                    data: labels.map((i) => {
                        return (i % 4) + 1
                    }),
                    //borderSkipped: 'false',
                    backgroundColor: barColor(),
                    borderColor: outlineColor(),
                    borderWidth: 2,
                    borderRadius: Number.MAX_VALUE,
                },
            ],
        }
    }

    return <Bar options={options()} data={data()} />
}
