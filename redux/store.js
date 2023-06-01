import { configureStore } from '@reduxjs/toolkit'
import bookSlice from './bookSlice'
import bookReportSlice from './bookkReportSlice'

export default configureStore({
    reducer:{
        book: bookSlice,
    }
    
})