import { TextInput } from '@mantine/core'
import { useRef } from 'react'
import { Search, X } from 'react-feather'

export default function SearchBar({ term, setTerm }) {
    const searchRef = useRef<HTMLInputElement>()

    const ClearSearch = ({ value }) => {
        console.log('SEARCH')
        console.log(value)
        return (
            <X
                strokeWidth="xs"
                color="gray"
                size="18px"
                onClick={() => {
                    searchRef.current.value = null
                    setTerm([])
                }}
            />
        )
    }

    return (
        <TextInput
            ref={searchRef}
            onChange={(event) => {
                setTerm(event.currentTarget.value)
            }}
            type="search"
            radius="md"
            placeholder="Search Study Location"
            icon={<Search size={14} />}
            rightSection={term ? <ClearSearch value={this} /> : <></>}
            value={term}
            style={{ margin: '0.75em 0.5em 0.5em 0.5em' }}
        />
    )
}
