import SubStudySpaces from "./substudyspaces";
import Link from 'next/link'

export default function StudySpaceList({ studyspaces }) {
	return (
		<div>
			{studyspaces.map(location => (
				<div>
					<Link href={`${location.name}`}>{location.name}</Link>
					<p>Subareas:</p>
					<SubStudySpaces location={location.name} subareas={location.sub_locations} />
				</div>)
			)}
		</div>
	)
}