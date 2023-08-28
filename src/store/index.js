import { configureStore } from '@reduxjs/toolkit';
import {reducer} from "../modules/students/studentSlice";

export const store = configureStore({
  reducer: {
    studentReducer:reducer,
    devTools: true,
},
});