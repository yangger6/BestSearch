import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import trendReducer from './trendSlice'
export const index = configureStore({
    reducer: {
        trend: trendReducer,
    },
})

export type AppDispatch = typeof index.dispatch
export type RootState = ReturnType<typeof index.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
