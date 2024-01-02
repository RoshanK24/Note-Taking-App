import {createSlice} from '@reduxjs/toolkit';

const notesSlice = createSlice({
    name: "notes",
    initialState: [],
    reducers: {
        addNote(state, action){ 
            state.push(action.payload);
        },
        removeNote(state, action){ 
            state.splice(action.payload,1);
        },
        editNote(state, action){
            const { index, updatedNote } = action.payload;
            state[index] = updatedNote;
        },
        removeAll(state, action){
            return [];
        }
    }
});

export default notesSlice.reducer;
export const {addNote, removeNote, editNote, removeAll} = notesSlice.actions;