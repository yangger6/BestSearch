import { IProductTrendItem, keywordSearch } from '../service/interviewService'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './index'

export interface TrendState {
    search: string
    list: IProductTrendItem[]
    status: 'idle' | 'loading'
}
const initialTrendState: TrendState = {
    search: '',
    list: [],
    status: 'idle',
}

export const fetchTrendsList = createAsyncThunk(
    'trend/fetchList',
    async (keyword: string) => {
        const result = await keywordSearch(keyword)
        return result.data.data.product_trends
    }
)
export const trendSlice = createSlice({
    name: 'trend',
    initialState: initialTrendState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        clearSearch: (state) => {
            state.search = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrendsList.pending, (state, action) => {
                state.list = []
                state.status = 'loading'
            })
            .addCase(fetchTrendsList.fulfilled, (state, action) => {
                state.status = 'idle'
                state.list = action.payload
            })
    },
})
export const { setSearch } = trendSlice.actions
export const selectTrendList = (state: RootState) => state.trend.list
export const selectTrendSearch = (state: RootState) => state.trend.search
export const selectTrendIsFetching = (state: RootState) =>
    state.trend.status === 'loading'
export default trendSlice.reducer
