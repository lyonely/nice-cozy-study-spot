import { Tooltip } from '@mantine/core'
import { useEffect, useState } from 'react'
import { Star } from 'tabler-icons-react'
import { getCookie, setCookie, removeCookie } from 'typescript-cookie'

export default function StarButton({ index }) {

    const inside = getCookie('favourites').split(',').includes((index || "hi").toString())

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
                        if (element == index.toString()) arr.splice(i, 1)
                    })
                } else {
                    arr.push(index)
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
