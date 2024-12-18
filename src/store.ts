import { configureStore } from '@reduxjs/toolkit'
import scheduleReducer from './slices/schedulescheduleSlice'
import threadReducer from './slices/threadSlice'

export const store = configureStore({
    reducer: {
        schedule: scheduleReducer,
        thread: threadReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch