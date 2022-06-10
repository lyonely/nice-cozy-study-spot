import SubStudySpaces from "./substudyspaces";
import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from "react-feather";

export default function StudySpaceList({ studyspaces }) {
	const [showsub, setShowsub] = useState(false)

	const handleShowSub = () => {
		setShowsub(!showsub)
	}

	return (
		<div>
			{studyspaces.map(location => (
				<div>
					<Link href={`${location.name}`}>{location.name}</Link>
					{showsub ? <ChevronUp onClick={handleShowSub} /> : <ChevronDown onClick={handleShowSub} />}

					{showsub && <><p>Subareas:</p>
						<SubStudySpaces location={location.name} subareas={location.sub_locations} />
					</>}
				</div>)
			)}
		</div>
	)
}