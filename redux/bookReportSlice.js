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
            // state.data.push({
            //     content: newReport.content,
            //     date: '오늘 날짜',
            //     isbn: newReport.isbn,
            //     readingStatus : newReport.readingStatus,
            //     title: newReport.title,
            // });
        },

    },
});

export const { addReport } = bookReportSlice.actions;
export default bookReportSlice.reducer;