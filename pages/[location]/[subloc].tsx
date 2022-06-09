import { useRouter } from 'next/router'

export default function SubLocation() {
	const router = useRouter()
	const { query: { subloc } } = router
	return (
		<div>
			<p>{subloc}</p>
		</div>
	)
}