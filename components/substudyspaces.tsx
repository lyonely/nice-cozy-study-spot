import Link from "next/link";

export default function SubStudySpaces({ subareas }) {
	return (
		subareas.map(subarea => <div>
			<Link href={`/${subarea.name}`} >{subarea.name}</Link >
			<p>Capacity: {subarea.capacity} out of {subarea.max_capacity}</p>
		</div>)
	)
}