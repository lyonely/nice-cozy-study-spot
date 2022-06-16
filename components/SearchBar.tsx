import { TextInput } from '@mantine/core'
import { Search } from 'react-feather';

export default function SearchBar({ setTerm }) {

	return (
		<TextInput onChange={(event) => { setTerm(event.currentTarget.value) }}
			type="search"
			radius="md"
			placeholder="Search Study Location"
			icon={<Search size={14} />}
			style={{ margin: "0.75em 0.5em 0.5em 0.5em" }}
		/>
	);
}