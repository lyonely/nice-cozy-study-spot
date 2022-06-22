import { createContext, useContext, useState } from 'react'

const AppContext = createContext({
    filter: { filters: [], setFilters: (x) => {} },
    search: { term: '', setTerm: (x) => {} },
    sort: { sortOrder: '', setSortOrder: (x) => {} },
})

export function AppWrapper({ children }) {
    const [filters, setFilters] = useState([])
    const [term, setTerm] = useState('')
    const [sortOrder, setSortOrder] = useState('')

    const value = {
        filter: { filters, setFilters },
        search: { term, setTerm },
        sort: { sortOrder, setSortOrder },
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
    return useContext(AppContext)
}
