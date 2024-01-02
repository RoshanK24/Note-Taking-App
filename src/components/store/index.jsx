import { configureStore } from "@reduxjs/toolkit";
import  notesSlice  from "./slices/noteSlice";

const store = configureStore({
    reducer: {
        notes: notesSlice,
    }
});

export default store;