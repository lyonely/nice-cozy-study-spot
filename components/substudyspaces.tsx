import Link from 'next/link'
import { Text, Button } from '@mantine/core'
import CapacityBar from './CapacityBar'
import { subCapacity } from '../utils/capacity'

export default function SubStudySpaces({ location, sub_locations }) {
	return sub_locations.map((sub) => {


		return (
			<Link href={`/${location}/${sub.name}`}>
				<Button
					classNames={{
						inner: 'sublocation__button',
						label: 'sublocation__label',
					}}
					fullWidth
					variant="light"
					color="yellow"
					style={{
						height: 'auto',
						marginBottom: '0.25em',
						padding: '0.25em',
						color: 'black',
					}}
				>
					<Text align="center" style={{ width: '100%' }} weight={500}>
						{sub.name}
					</Text>

					<CapacityBar
						capacity={subCapacity(sub)}
						isSubLocation={true}
					/>
				</Button>
			</Link>
		)
	})
}
