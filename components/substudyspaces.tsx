import Link from "next/link";

export default function SubStudySpaces({ location, subareas }) {
	return (
		subareas.map(subarea => <div>
			<Link href={`/${location}/${subarea.name}`} >{subarea.name}</Link >
			<p>Capacity: {subarea.capacity} out of {subarea.max_capacity}</p>
		</div>)
	)
}