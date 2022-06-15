import {
    Card,
    Image,
    Text,
    Group,
    Badge,
    Accordion,
    Box,
    createStyles,
    CardSection,
} from '@mantine/core'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'
import { AppTheme } from '../style/AppTheme'
import { fetcher } from '../utils/fetcher'


const days = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
]



export default function OpeningHours() {
    const router = useRouter()
    const { query: { location } } = router
    const { data, error } = useSWR(`/api/${location}`, fetcher)




    const openingTimes = days.map((day) => (
        <div>
            <div style={{ width: 125, float: 'left' }}>
                <Text weight={500}>{day}: </Text>
            </div>
            <div>
                <Text>{moment(data.time_open).format('hh a')} - {moment(data.time_closed).format('hh a')}</Text>
            </div>
        </div >
    ))

    return (
        <>
            <Accordion iconPosition="right">
                <Accordion.Item label={<Text underline>Opening Hours</Text>}>
                    {openingTimes}
                </Accordion.Item>
            </Accordion>
        </>
    )
}


