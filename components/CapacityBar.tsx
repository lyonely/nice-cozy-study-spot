export default function CapacityBar({ capacity, isSubLocation }) {
	const color = () => {
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

	const innerBarStyle = {
		width: `${capacity}%`,
		background: color(),
	}

	return (
		<div className={isSubLocation ? "capacity-bar__sublocation" : "capacity-bar"}>
			<div className="capacity-bar__inner" style={innerBarStyle}></div>
		</div>
	)
}
