import { useRouter } from 'next/router'
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import LocationPageCard from "../../components/LocationPageCard";
import { Container } from "@mantine/core";
import BackButton from '../../components/BackButton';

export default function Location() {
	const router = useRouter()
	const { query: { location } } = router
	const { data, error } = useSWR(`/api/${location}`, fetcher)

	return (
		<Container>

			<BackButton url="/studyspaces" text="Location List" />
			{data ? (
				<LocationPageCard location={data} />) : <p>Loading...</p>}
		</Container>
	)
}