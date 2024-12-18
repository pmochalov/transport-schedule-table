import { configureStore } from '@reduxjs/toolkit'
import scheduleReducer from './slices/schedulescheduleSlice'

export const store = configureStore({
    reducer: {
        schedule: scheduleReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch