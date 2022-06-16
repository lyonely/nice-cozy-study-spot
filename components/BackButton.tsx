import { Group, Text } from "@mantine/core";
import Link from "next/link";
import { ArrowLeft } from "react-feather";


export default function BackButton({ url, text }) {
	return (
		<Link href={url}>
			<Group spacing="xs" style={{ padding: "0.5em 0 0.5em 0.5em" }}>
				<ArrowLeft strokeWidth="xs" />
				<Text weight={250}>{text}</Text>
			</Group>
		</Link>
	)
}
