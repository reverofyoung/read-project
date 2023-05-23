import { createSlice } from '@reduxjs/toolkit';

export const bookReportSlice = createSlice({
    name: "bookReport",
    initialState: { 
        data: []        
    }, 
    reducers: { 
        getIsbn: (state, action) => {
            // console.log(action.payload);
            const newReport= action.payload;
            state.data = newReport;
        },

    },
});

export const { getIsbn } = bookReportSlice.actions;
export default bookReportSlice.reducer;