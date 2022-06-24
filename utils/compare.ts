import { locationCapacity, subCapacity } from "./capacity"

export const compareLocations = (x, y, sortOrder) => {
	switch (sortOrder) {
		case 'a-z':
			return x.name.localeCompare(y.name)
		case 'z-a':
			return y.name.localeCompare(x.name)
		case 'capacity-incr':
			return (
				locationCapacity(x.sub_locations) -
				locationCapacity(y.sub_locations)
			)
		case 'capacity-decr':
			return (
				locationCapacity(y.sub_locations) -
				locationCapacity(x.sub_locations)
			)
		default:
			break
	}
}

export const compareSubLocations = (x, y, sortOrder) => {
	switch (sortOrder) {
		case 'a-z':
			return x.name.localeCompare(y.name)
		case 'z-a':
			return y.name.localeCompare(x.name)
		case 'capacity-incr':
			return (
				subCapacity(x) -
				subCapacity(y)
			)
		case 'capacity-decr':
			return (
				subCapacity(y) -
				subCapacity(x)
			)
		default:
			break
	}
}

