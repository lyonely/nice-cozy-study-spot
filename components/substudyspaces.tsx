import Link from "next/link";

export default function SubStudySpaces({ subareas }) {
	return (
		subareas.map(subarea => <div>
			<Link href={`/${subarea.name}`} >{subarea.name}</Link >
			<p>Capacity: {subarea.currcapacity} out of {subarea.maxcapacity}</p>
		</div>)
	)
}