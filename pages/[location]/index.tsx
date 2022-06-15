import { useRouter } from 'next/router'
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import LocationPageCard from "../../components/LocationPageCard";
import { Container } from "@mantine/core";

export default function Location() {
	const router = useRouter()
	const { query: { location } } = router
	const { data, error } = useSWR(`/api/${location}`, fetcher)

	return (
		<Container>
			{data ? (
				<LocationPageCard location={data} />) : <p>Loading...</p>}
		</Container>
	)
}