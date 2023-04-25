import { configureStore } from '@reduxjs/toolkit'
import bookSlice from './bookSlice'
import bookReportSlice from './bookReportSlice'

export default configureStore({
    reducer:{
        book: bookSlice,
        bookReport: bookReportSlice,
    }
    
})