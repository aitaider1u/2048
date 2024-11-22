import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice'; 
import gameStateSlice from './features/gameStateSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer, 
    gameState: gameStateSlice,
  },
});

export default store;