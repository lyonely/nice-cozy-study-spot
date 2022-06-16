import { Group, Text } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeft } from "react-feather";


export default function BackButton({ url, text }) {
	const router = useRouter()
	return (
		<Group onClick={() => router.back()} spacing="xs" style={{ padding: "0.5em 0 0.5em 0.5em" }}>
			<ArrowLeft strokeWidth="xs" />
			<Text weight={250}>Back</Text>
		</Group>
	)
}
