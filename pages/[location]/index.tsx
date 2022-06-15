import SubStudySpaces from "../../components/substudyspaces";
import { useRouter } from 'next/router'
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import moment from 'moment'
import OpeningHours from "../../components/OpeningHours";

export default function Location() {
	const router = useRouter()
	const { query: { location } } = router
	const { data, error } = useSWR(`/api/${location}`, fetcher)

	return (
		<div>
			{data ? (
				<>
					<p>{data.name}</p>
					<OpeningHours></OpeningHours>
					<SubStudySpaces location={location} subareas={data.sub_locations} />
				</>) : <p>"Loading..."</p>}
		</div>
	)
}