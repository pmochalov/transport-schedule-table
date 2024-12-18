import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { Station, Thread } from '../types';

type ThreadItem = {
    thread: Thread
}

type Schedule = {
    date: string;
    station: Station;
    schedule: ThreadItem[]
}

type Initial = {
    loading: boolean;
    error: string | null;
    data: Schedule;
}

const initialState: Initial = {
    loading: false,
    error: null,
    data: {
        date: '',
        station: {
            type: "",
            title: "",
            short_title: "",
            popular_title: "",
            code: "",
            station_type: "",
            station_type_name: "",
            transport_type: "all",
        },
        schedule: [] // Обратите внимание, что schedule должен быть пустым массивом ThreadItem[]
    }
};

export const fetchSchedule = createAsyncThunk<Schedule, { stationId: string }, {}>(
    'schedule/fetchSchedule',
    async ({ stationId }: { stationId: string }) => {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}schedule`, {
            station: stationId,
            date: "2024-12-18",
        });

        if (response.status !== 200) {
            throw new Error("Не удалось получить расписание.");
        }

        const data: Schedule = response.data;

        return data;
    },
);

export const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        resetScheduleState: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSchedule.pending, (state) => {
            state.loading = true;
            state.error = null;
            // state.schedule = {};
        })
        builder.addCase(fetchSchedule.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchSchedule.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Ошибка получения расписания.";
        })
    }
})

export const { resetScheduleState } = scheduleSlice.actions

export default scheduleSlice.reducer