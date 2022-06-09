import SubStudySpaces from "../../components/substudyspaces";
import { useRouter } from 'next/router'

export default function Location() {
	const router = useRouter()
	const { query: { location } } = router
	return (
		<div>
			<p>{location}</p>
		</div>
	)
}