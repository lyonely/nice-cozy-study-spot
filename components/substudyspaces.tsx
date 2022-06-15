import Link from 'next/link'
import { Badge, Group, Text, Button, Container, Center } from '@mantine/core'
import CapacityBar from './CapacityBar'

export default function SubStudySpaces({ location, subareas }) {
	return subareas.map((subarea) => {
		const min = Math.ceil(0)
		const max = Math.floor(100)
		const capacity = Math.floor(Math.random() * (max - min) + min)

		return (
			<Link href={`/${location}/${subarea.name}`}>
				<Button classNames={{ inner: "sublocation__button", label: "sublocation__label" }} fullWidth variant="light" color="yellow" style={{ height: "auto", marginBottom: "0.25em", padding: "0.25em", color: "black" }}>
					{/* <div className="sublocation-button"> */}
					{/* <div style={{ width: "100%", display: "flex", flexDirection: "column" }}> */}
					<Text align="center" style={{ width: '100%' }} weight={500}>
						{subarea.name}
					</Text>

					<CapacityBar capacity={capacity} isSubLocation={true} />
					{/* </div> */}
					{/* </div> */}
				</Button>

			</Link>
		)
	})
}
