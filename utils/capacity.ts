const capacity = (curr, max) => max === 0 ? 0 : curr / max * 100

export const subCapacity = (sub) => {
	const curr = parseInt(sub.capacity)
	const max = parseInt(sub.max_capacity)
	return capacity(curr, max)
}

export const locationCapacity = (sub_locations) => {
	const max = sub_locations.reduce(
		(acc: number, { max_capacity }) => acc + parseInt(max_capacity),
		0
	)
	const curr = sub_locations.reduce(
		(acc, { capacity }) => acc + parseInt(capacity),
		0
	)
	return capacity(curr, max)
}