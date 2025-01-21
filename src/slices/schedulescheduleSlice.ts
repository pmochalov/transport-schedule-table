import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { Event, EventDate, Station, Thread } from '../types';

type ThreadItem = {
    thread: Thread;
    days: string;
    arrival: string | null;
    departure: string | null;
}

type Schedule = {
    date: string;
    event: string;
    station: Station;
    schedule: ThreadItem[]
}

type Initial = {
    loading: boolean;
    error: string | null;
    data: Schedule;
}

type FetchParams = {
    stationId: undefined | string;
    date?: EventDate;
    event?: null | Event;
}

const initialState: Initial = {
    loading: false,
    error: null,
    data: {
        date: '',
        event: '',
        station: {
            type: "",
            title: "",
            short_title: "",
            popular_title: "",
            code: "",
            station_type: "",
            station_type_name: "",
            transport_type: "train",
        },
        schedule: [] // Обратите внимание, что schedule должен быть пустым массивом ThreadItem[]
    }
};

export const fetchSchedule = createAsyncThunk<Schedule, FetchParams, {}>(
    'schedule/fetchSchedule',
    async ({ stationId, date, event }: FetchParams) => {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}schedule`, {
            station: stationId,
            date,
            event
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