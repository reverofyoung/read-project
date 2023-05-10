import { createSlice } from '@reduxjs/toolkit';

export const bookReportSlice = createSlice({
    name: "bookReport",
    initialState: { 
        data: []        
    }, 
    reducers: { 
        addReport: (state, action) => {
            // console.log(action.payload);
            const newReport= action.payload;
            state.data = newReport;
        },

    },
});

export const { addReport } = bookReportSlice.actions;
export default bookReportSlice.reducer;