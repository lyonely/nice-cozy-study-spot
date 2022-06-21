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

export default function CapacityGraph({ datapoints }) {
	const outlineColor = () => {
		return 'rgba(0, 0, 0, 255)'
	}

	const barColor = () => {
		return 'rgba(175, 175, 175, 255)'
	}

	const options = () => {
		return {
			responsive: true,
			maintainAspectRatio: false,
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

	const labels = Object.keys(datapoints)
	const values = Object.values(datapoints)

	const data = () => {
		return {
			labels,
			datasets: [
				{
					label: 'Capacity',
					data: values,
					backgroundColor: barColor(),
					borderColor: outlineColor(),
					borderWidth: 2,
					borderRadius: Number.MAX_VALUE,
				},
			],
		}
	}

	return <div style={{ height: "100px" }}><Bar options={options()} data={data()} /></div>
}
