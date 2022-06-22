import { Container, Group, MultiSelect, Select, Text } from '@mantine/core'
import LocationListCard from './LocationCard'
import SearchBar from './SearchBar'
import { useState, useEffect, useContext } from 'react'
import SubLocationSearchCard from './SubLocationSearchCard'
import LoadingCircle from './LoadingCircle'
import { compareLocations, compareSubLocations } from '../utils/compare'
import { useAppContext } from '../utils/state'
import { getCookie } from 'typescript-cookie'

const allSortOrders = () => {
	return [
		{ value: 'a-z', label: 'A-Z' },
		{ value: 'z-a', label: 'Z-A' },
		{ value: 'capacity-incr', label: 'Capacity (low-high)' },
		{ value: 'capacity-decr', label: 'Capacity (high-low)' },
	]
}

const allFilters = () => {
	return [
		{ value: 'card_access_needed', label: 'Card access' },
		{ value: 'microwave', label: 'Microwave' },
		{ value: 'printer', label: 'Printer' },
		{ value: 'monitor', label: 'Monitor' },
		{ value: 'plug_sockets', label: 'Charging sockets' },
		{ value: 'whiteboard', label: 'Whiteboard' },
		{ value: 'toilets_nearby', label: 'Toilets nearby' },
		{ value: 'quiet_study_available', label: 'Quiet study' },
		{ value: 'group_study_available', label: 'Group study' },
		{ value: 'silent_study_available', label: 'Silent study' },
		{ value: 'breakout_space_available', label: 'Breakout spaces' },
		{ value: 'height_adjustable_desks', label: 'Height adjustable desks' },
	]
}

export default function StudySpaceList() {
	const [data, setData] = useState<any[]>([])
	const [subLocData, setSubLocData] = useState<any[]>()
	const { user } = useUser()
	const {
		filter: { filters, setFilters },
		search: { term, setTerm },
		sort: { sortOrder, setSortOrder },
	} = useAppContext()

	const fetchLocations = async () => {
		if (filters.length === 0) {
			const resp = await fetch(`/api/locations?term=${term}`)
			setData(await resp.json())
		} else {
			setData([])
		}
	}

	const fetchSubLocations = async () => {
		if (term || filters.length > 0) {
			setSubLocData(
				await (
					await fetch(`/api/sublocations?term=${term}`, {
						body: JSON.stringify({ filters }),
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
					})
				).json()
			)
		}
	}

	useEffect(() => {
		console.log(filters)
	}, [filters])

	useEffect(() => {
		console.log(data)
		console.log(subLocData)
	}, [data])

	useEffect(() => {
		fetchLocations()
		if (term || filters.length > 0) {
			fetchSubLocations()
			console.log(term)
		}
	}, [term, filters])
	return data ? (
		<Container>
			<SearchBar term={term} setTerm={setTerm} />
			<Group
				direction="row"
				position="left"
				spacing="xs"
				align="flex-start"
				style={{ margin: '0 0.5em 0.5em 0.5em' }}
			>
				<Select
					placeholder="Sort by:"
					value={sortOrder}
					onChange={setSortOrder}
					data={allSortOrders()}
					style={{ maxWidth: '27%' }}
				/>
				<MultiSelect
					placeholder="Filter by:"
					data={allFilters().sort((x, y) => {
						return x.label.localeCompare(y.label)
					})}
					onChange={setFilters}
					value={filters}
					clearable
					style={{ maxWidth: '55%' }}
				/>
			</Group>
			{arr && arr.length !== 0 && (
				<>
					<Text size="xs" align="center" color="gray">
						Favourites
					</Text>
					{arr
						.map((sl) => (
							<SubLocationSearchCard
								sub_location={sl}
								key={sl.name}
							/>
						))}
				</>
			)}
			{data && data.length !== 0 && (
				<>
					<Text size="md" align="center" color="gray">
						Locations
					</Text>
					{data
						.sort((x, y) => compareLocations(x, y, sortOrder))
						.map((location) => (
							<LocationListCard
								location={location}
								key={location.name}
							/>
						))}
				</>
			)}
			{subLocData && subLocData.length !== 0 && (
				<>
					<Text size="xs" align="center" color="gray">
						Sub Locations
					</Text>
					{subLocData
						.sort((x, y) => compareSubLocations(x, y, sortOrder))
						.map((sl) => (
							<SubLocationSearchCard
								sub_location={sl}
								key={sl.name}
							/>
						))}
				</>
			)}
		</Container>
	) : (
		<LoadingCircle />
	)
}
