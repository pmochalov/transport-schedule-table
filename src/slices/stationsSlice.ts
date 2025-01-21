import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { Station } from '../types';

type Stations = {
    stations: Station[]
}

type Initial = {
    loading: boolean;
    error: string | null;
    data: Stations;
}

const initialState: Initial = {
    loading: false,
    error: null,
    data: {
        stations: []
    }
};

export const fetchStations = createAsyncThunk<Stations, {}, {}>(
    'stations/fetchStations',
    async () => {
        const apiUrl = `${import.meta.env.VITE_API_URL}/`;
        const response = await axios.post(`${apiUrl}nearest_stations`, {
            station_types: "station,airport,bus_station"
        });

        if (response.status !== 200) {
            throw new Error("Не удалось получить станции.");
        }

        const data: Stations = response.data;

        return data;
    },
);

export const stationsSlice = createSlice({
    name: 'stations',
    initialState,
    reducers: {
        resetStationsState: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(fetchStations.pending, (state) => {
            state.loading = true;
            state.error = null;
            // state.schedule = {};
        })
        builder.addCase(fetchStations.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchStations.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Ошибка получения ветки.";
        })
    }
})

export const { resetStationsState } = stationsSlice.actions

export default stationsSlice.reducer