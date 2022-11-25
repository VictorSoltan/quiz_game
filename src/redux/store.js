import { configureStore } from '@reduxjs/toolkit'

import signedSlice from './slices/signed';
import inGameSlice from './slices/inGame';

export default configureStore({
  reducer: {
  	signed: signedSlice.reducer,
	  inGame: inGameSlice.reducer,
  },
  devTools: true,
})