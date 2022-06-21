import { Tooltip } from '@mantine/core'
import { useEffect, useState } from 'react'
import { Star } from 'tabler-icons-react'
import { getCookie, setCookie, removeCookie } from 'typescript-cookie'

export default function StarButton({ index, is_parent_location }) {

    const id = (is_parent_location) ? index : (100 - index)
    const inside = getCookie('favourites').split(',').includes((id || "hi").toString())

    const [saved, setSaved] = useState(inside)

    return (
        <Star
            strokeWidth={2}
            size={20}
            fill={saved ? "black" : "white"}
            className={saved ? 'star__filled' : 'star'} 
            onClick={() => {
                var value = getCookie('favourites')
                const arr = value.split(',')
                if (saved) {
                    arr.forEach((element, i) => {
                        if (element == id.toString()) arr.splice(i, 1)
                    })
                } else {
                    arr.push(id)
                }
                let joined = arr.join()
                removeCookie('favourites')
                setCookie('favourites', joined, { expires: 7, path: '/' })
                setSaved(!saved)
            }
            }
        />
    )
}
