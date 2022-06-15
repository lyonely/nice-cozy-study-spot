import React, { useState, useEffect } from 'react'
import { fetcher } from "../utils/fetcher"
import useSWR from 'swr'
import StudySpaceList from '../components/studyspaceList'

export default function Locations() {
	const { data, error } = useSWR('/api/locations', fetcher)

	useEffect(() => {
		console.log(data)
	}, [data])

	return (<div>
		{error ? "Error occured, please refresh the page" : data ?
			<StudySpaceList studyspaces={data} />
			: "Loading..."}
	</div>
	)
}