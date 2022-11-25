import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    signed: false,
}
const signedSlice = createSlice({
    name: 'signed',
    initialState: initialState,
    reducers: {
        setSignedReducer: (state, action) => {
            state.signed = action.payload;
        }
    }
});

export const signedSelector = {
    getSigned: (state) => state.signed
}

export const {setSignedReducer} = signedSlice.actions;

export default signedSlice;