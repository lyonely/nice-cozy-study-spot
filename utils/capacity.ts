const capacity = (curr, max) => (max === 0 ? 0 : (curr / max) * 100)

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

export const capacityColor = (capacity) => {
    switch (true) {
        case 0 <= capacity && capacity < 20:
            return '#60F13C'
        case 20 <= capacity && capacity < 40:
            return '#C0FF3C'
        case 40 <= capacity && capacity < 60:
            return '#FFE03C'
        case 60 <= capacity && capacity < 80:
            return '#FF993C'
        case 80 <= capacity && capacity <= 100:
            return '#F25330'
        default:
            console.log(capacity) // should not be reached
    }
}
