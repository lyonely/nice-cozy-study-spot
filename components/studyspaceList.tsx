import { Group, Container } from "@mantine/core"
import LocationCard from './LocationCard'


export default function StudySpaceList({ studyspaces }) {
	return (
		<Container>
			{/* <Group direction="column"> */}
			{studyspaces.map(location => (
				<LocationCard name={location.name} imgPath="" sub_locations={location.sub_locations} />)
			)}
			{/* </Group> */}
		</Container>
	)
}