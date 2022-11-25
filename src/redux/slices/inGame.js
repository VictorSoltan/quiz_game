import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    inGame: false,
}
const inGameSlice = createSlice({
    name: 'inGame',
    initialState: initialState,
    reducers: {
        setInGameReducer: (state, action) => {
            state.inGame = action.payload;
        }
    }
});

export const inGameSelector = {
    getInGame: (state) => state.inGame
}

export const {setInGameReducer} = inGameSlice.actions;

export default inGameSlice;