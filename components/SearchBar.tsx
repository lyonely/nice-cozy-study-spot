import { TextInput } from '@mantine/core'
import { Search, X } from 'react-feather';

export default function SearchBar({ term, setTerm }) {

	const ClearSearch = ({ value }) => {
		console.log("SEARCH")
		console.log(value)
		return (<X strokeWidth='xs' color="gray" size="18px" onClick={
			(e) => {
				e.preventDefault()
				setTerm(null)
			}} />)
	}

	return (
		<TextInput onChange={(event) => { setTerm(event.currentTarget.value) }}
			type="search"
			radius="md"
			placeholder="Search Study Location"
			icon={<Search size={14} />}
			rightSection={term ? <ClearSearch value={this} /> : <></>}
			style={{ margin: "0.75em 0.5em 0.5em 0.5em" }}
		/>
	);
}

