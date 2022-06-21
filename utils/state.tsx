import { createContext, useContext, useState } from 'react'

const AppContext = createContext({
    filters: [],
    setFilters: (x) => {},
})

export function AppWrapper({ children }) {
    const [filters, setFilters] = useState([])

    const value = { filters, setFilters }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
    return useContext(AppContext)
}
