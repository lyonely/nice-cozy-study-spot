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
	const [favourites, setFavourites] = useState<any[]>([])
	const [data, setData] = useState<any[]>([])
	const [subLocData, setSubLocData] = useState<any[]>()

	const {
		filter: { filters, setFilters },
		search: { term, setTerm },
		sort: { sortOrder, setSortOrder },
	} = useAppContext()

	useEffect(() => {
		const arr = getCookie('favourites')
		if (arr) {
			const newarr = arr.split(',')
			newarr.shift()
			fetchFavourites(newarr)
		}
	}, [])

	const fetchFavourites = async (arr) => {

		console.log(`fetch params:`)
		console.log(arr.length)
		if (arr.length === 0) {
			return
		}
		const resp = await fetch(`/api/favouriteSl`, {
			method: 'POST',
			body: JSON.stringify({ ids: arr }),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		setFavourites(await resp.json())
	}

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
		console.log(favourites)
	}, [favourites])

	useEffect(() => {
		fetchLocations()
		if (term || filters.length > 0) {
			fetchSubLocations()
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
                    clearable
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
            {favourites && favourites.length > 0 && !sortOrder && !term && filters.length == 0 && (
				<>
					<Text size="xs" align="center" color="gray">
						Favourites
					</Text>
					{favourites
						.map((sl) => (
							<SubLocationSearchCard
								sub_location={sl}
								key={sl.name}
							/>
						))
					}
				</>
			)
			}
			{
				data && data.length !== 0 && (
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
				)
			}
			{
				subLocData && subLocData.length !== 0 && (
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
				)
			}
		</Container >
	) : (
		<LoadingCircle />
	)
}
