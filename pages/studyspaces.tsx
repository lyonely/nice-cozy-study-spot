import React, { useState, useEffect } from 'react'
import { fetcher } from "../utils/fetcher"
import useSWR from 'swr'
import StudySpaceList from '../components/studyspaceList'


export default function Locations() {

	return (<div className="bg">

		<StudySpaceList />
	</div>
	)
}