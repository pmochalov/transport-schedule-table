import { configureStore } from '@reduxjs/toolkit'
import scheduleReducer from './slices/schedulescheduleSlice'
import threadReducer from './slices/threadSlice'
import stationsReducer from './slices/stationsSlice'

export const store = configureStore({
    reducer: {
        schedule: scheduleReducer,
        thread: threadReducer,
        stations: stationsReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch