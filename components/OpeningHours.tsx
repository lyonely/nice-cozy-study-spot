import {
	Card,
	Image,
	Text,
	Group,
	Badge,
	Accordion,
	Box,
	createStyles,
	CardSection,
} from '@mantine/core'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'
import { AppTheme } from '../style/AppTheme'
import { fetcher } from '../utils/fetcher'





export default function OpeningHours({ location }) {
	const days = [
		'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
	]

	return (<>
		{days.map((day) => (
			<div>
				<div style={{ width: 125, float: 'left' }}>
					<Text weight={500}>{day}: </Text>
				</div>
				<div>
					<Text>{moment(location.time_open).format('hh a')} - {moment(location.time_closed).format('hh a')}</Text>
				</div>
			</div >))}
	</>
	)
}


