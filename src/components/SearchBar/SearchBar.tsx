import { useEffect, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import { Button, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
    fetchTrendsList,
    selectTrendSearch,
    setSearch,
} from '../../store/trendSlice'
import useDebounce from '../../utils/hooks'
import { optionsSearch } from '../../service/interviewService'
import './SearchBar.css'

export default function SearchBar() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const trendSearch = useAppSelector(selectTrendSearch) // store search
    const debounceSearch = useDebounce(trendSearch, 300)
    const [options, setOptions] = useState<string[]>([])
    const searchHandle = async (searchKeyword = trendSearch) => {
        if (!searchKeyword) {
            // empty search keyword
            return
        }
        navigate(`/search/${searchKeyword.replace(/\s/g, '+')}`)
        dispatch(fetchTrendsList(searchKeyword))
    }
    useEffect(() => {
        // debounce load options to select
        optionsSearch(debounceSearch)
            .then(setOptions)
            .catch((err) => console.error)
    }, [debounceSearch])
    return (
        <div className="search-bar flex w-full">
            <Autocomplete
                value={trendSearch}
                onChange={async (event, newVal) => {
                    dispatch(setSearch(newVal as string))
                    await searchHandle(newVal as string)
                }}
                onInput={(event) => {
                    const value = (event.target as HTMLInputElement).value
                    if (value) {
                        dispatch(setSearch(value))
                    }
                }}
                onKeyDown={async (event) => {
                    if (event.key === 'Enter') {
                        await searchHandle()
                    }
                }}
                className="flex-1"
                freeSolo
                options={options}
                renderInput={(params) => {
                    return (
                        <TextField
                            placeholder="Search for new products in 961K stores"
                            {...params}
                        />
                    )
                }}
            />
            <Button
                variant="outlined"
                className=""
                onClick={async () => {
                    await searchHandle()
                }}
            >
                <SearchIcon />
            </Button>
        </div>
    )
}
