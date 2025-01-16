import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { Thread } from '../types';
import { Station } from '../types';


type Initial = {
    loading: boolean;
    error: string | null;
    data: Thread;
}

const initialState: Initial = {
    loading: false,
    error: null,
    data: {
        title: "",
        uid: "",
        number: "",
        short_title: "",
        stops: [],
        days: ""
    }
};

export const fetchThread = createAsyncThunk<Thread, { uid: string }, {}>(
    'thread/fetchThread',
    async ({ uid }) => {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}thread`, {
            uid: uid
        });

        if (response.status !== 200) {
            throw new Error("Не удалось получить расписание.");
        }

        const data: Thread = response.data;

        return data;
    },
);

export const threadSlice = createSlice({
    name: 'thread',
    initialState,
    reducers: {
        resetThreadState: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(fetchThread.pending, (state) => {
            state.loading = true;
            state.error = null;
            // state.schedule = {};
        })
        builder.addCase(fetchThread.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchThread.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Ошибка получения ветки.";
        })
    }
})

export const { resetThreadState } = threadSlice.actions

export default threadSlice.reducer