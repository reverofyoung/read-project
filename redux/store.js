import { configureStore } from '@reduxjs/toolkit'
import bookSlice from './book'

export default configureStore({
    reducer:{
        book: bookSlice
    }
})