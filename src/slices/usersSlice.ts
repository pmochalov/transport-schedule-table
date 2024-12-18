import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { User, UsersState } from '../types';

const initialState: UsersState = {
    loading: false,
    error: null,
    entities: [],
}

export const fetchUsers = createAsyncThunk<User[], void, {}>(
    'users/fetchUsers',
    async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}?results=${import.meta.env.VITE_COUNT_RESULTS_IN_PAGE}`);
        const users: User[] = response.data.results.map((user: User) => {
            return {
                key: user.login.uuid,
                name: `${user.name.first} ${user.name.last}`,
                login: user.login.username,
                age: user.dob.age,
                email: user.email,
                country: user.location.country,
                city: user.location.city
            }
        })

        return users;
    },
);

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        resetUsersState: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.entities = [];
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.entities = [...state.entities, ...action.payload];
            state.loading = false;
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Ошибка получения пользователей.";
        })
    }
})

export const { resetUsersState } = usersSlice.actions

export default usersSlice.reducer