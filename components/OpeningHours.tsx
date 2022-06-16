import {
	Text,
} from '@mantine/core'
import moment from 'moment'



// Opening hours chart
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


