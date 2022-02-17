import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PrimaryLayout from '../layout/PrimaryLayout'
import SearchBar from '../components/SearchBar/SearchBar'
import { Grid } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
    fetchTrendsList,
    selectTrendIsFetching,
    selectTrendList,
    setSearch,
} from '../store/trendSlice'
import SkeletonCard from '../components/SkeletonCard/SkeletonCard'
import TrendCard from '../components/TrendCard/TrendCard'

const GridItem = ({ children }: { children: React.ReactNode }) => {
    return (
        <Grid
            item
            xs={12}
            md={6}
            lg={3}
            className="xl:aspect-3/4 aspect-square"
        >
            {children}
        </Grid>
    )
}

export default function Search() {
    const { keyword } = useParams()
    const dispatch = useAppDispatch()
    const isFetchTrend = useAppSelector(selectTrendIsFetching)
    const trendList = useAppSelector(selectTrendList)
    useEffect(() => {
        if (keyword) {
            const currentKeyWord = keyword.replace(/\+/g, ' ') // + -> /s
            dispatch(setSearch(currentKeyWord)) // sync location query to store
            dispatch(fetchTrendsList(currentKeyWord))
        }
    }, [])
    return (
        <PrimaryLayout header={<SearchBar />}>
            <div className="search-page flex flex-col">
                <span className="mt-10 mb-6 text-xl">
                    Relate product trends
                </span>
                <Grid container spacing={2}>
                    {/*loading SkeletonCard*/}
                    {isFetchTrend &&
                        Array(4)
                            .fill('*')
                            .map((_, key) => {
                                return (
                                    <GridItem key={key}>
                                        <SkeletonCard />
                                    </GridItem>
                                )
                            })}
                    {/*render trend card*/}
                    {trendList.map((trendItem) => {
                        return (
                            <GridItem key={trendItem.name}>
                                <TrendCard record={trendItem} />
                            </GridItem>
                        )
                    })}
                </Grid>
            </div>
        </PrimaryLayout>
    )
}
