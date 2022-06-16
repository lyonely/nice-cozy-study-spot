import { capacityColor } from '../utils/capacity'

export default function CapacityBar({ capacity, isSubLocation }) {
    const innerBarStyle = {
        width: `${capacity}%`,
        background: capacityColor(capacity),
    }

    return (
        <div
            className={
                isSubLocation ? 'capacity-bar__sublocation' : 'capacity-bar'
            }
        >
            <div className="capacity-bar__inner" style={innerBarStyle}></div>
        </div>
    )
}
