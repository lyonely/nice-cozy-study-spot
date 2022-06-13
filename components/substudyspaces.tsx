import Link from "next/link";
import { Badge, Group, Text, Button, Container } from "@mantine/core"

export default function SubStudySpaces({ location, subareas }) {

	const badgeGenerator = (capacity) => {
		if (capacity > 80) {
			return <Badge color="pink" variant="light">
				Capacity: {capacity}
			</Badge>
		} else if (capacity > 50) {
			return <Badge color="orange" variant="light">
				Capacity: {capacity}
			</Badge>
		} else {
			return <Badge color="green" variant="light">
				Capacity: {capacity}
			</Badge>
		}
	}
	return (
		subareas.map(subarea => {

			const min = Math.ceil(0);
			const max = Math.floor(100);
			const capacity = Math.floor(Math.random() * (max - min) + min);

			return (<Group>
				<Link href={`/${location}/${subarea.name}`} >
					<Button variant="light" color="yellow" fullWidth style={{ height: "auto", marginBottom: "0.25em", padding: "0.25em", color: "black" }}>
						<Container>
							<Text align="left" style={{ width: "50%" }} weight={500}>
								{subarea.name}</Text>
							{badgeGenerator(capacity)}
						</Container>
					</Button>

				</Link >
			</Group>
			)
		})
	)
}