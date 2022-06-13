import { Card, Image, Text, Group, Badge, Accordion, createStyles } from '@mantine/core'
import { useState } from 'react'
import { AppTheme } from '../style/AppTheme';
import SubStudySpaces from './substudyspaces';
import Link from 'next/link'

export default function LocationCard({ imgPath, name, sub_locations }) {
	const useStyles = createStyles((theme) => ({
		content: {
			paddingLeft: 0
		}
	}))
	const { classes } = useStyles()

	return (
		<Card shadow="sm" radius="lg" p="md" withBorder style={{
			margin: "1.5em 0.5em 1.5em 0.5em"
		}}>
			<Card.Section>
				<Link href={name} passHref>
					<Image height={160} src={imgPath} alt={name} withPlaceholder
						placeholder={
							<Image height={160} src="https://www.imperial.ac.uk/media/migration/administration-and-support-services/library-3--tojpeg_1550242474436_x2.jpg"></Image>
						} />

				</Link>
			</Card.Section>
			<Link href={name} passHref>
				<Group position="apart" style={{ marginTop: "1em" }}>
					<Text weight={500}>{name}</Text>
					<Badge color="pink" variant="light">
						Capacity: 90%
					</Badge>
				</Group>
			</Link>
			<Accordion classNames={classes}>
				<Accordion.Item label="Details">
					<SubStudySpaces location={name} subareas={sub_locations} />
				</Accordion.Item>
			</Accordion>
		</Card >
	)
}