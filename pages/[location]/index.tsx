import SubStudySpaces from "../../components/substudyspaces";
import { useRouter } from 'next/router'
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import moment from 'moment'

export default function Location() {
	const router = useRouter()
	const { query: { location } } = router
	const { data, error } = useSWR(`/api/${location}`, fetcher)

	return (
		<div>
			{data ? (
				<>
					<p>{data.name}</p>
					<p>Opening Times:</p>
					<p>{moment(data.time_open).format('dddd HH')}</p>
					<p>{moment(data.time_closed).format('dddd HH')}</p>
					<SubStudySpaces subareas={data.sub_locations} />
				</>) : <p>"Loading..."</p>}
		</div>
	)
}