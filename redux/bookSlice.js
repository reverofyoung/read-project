import { createSlice } from '@reduxjs/toolkit';

export const bookSlice = createSlice({
    
    name: "book", // 리듀서 이름
    initialState: { // 데이터의 초기값
        value: []        
    }, 
    reducers: { // 상태가 변하면 어떻게 실행될지
        clickedBook: (state, action) => {
            const newBook = action.payload;
            state.value.push({
                authors: newBook.authors,
                isbn: newBook.isbn,
                thumbnail: newBook.thumbnail,
                title: newBook.title,
                readingStatus : newBook.readingStatus,
            });
        },
        deleteBook: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { clickedBook, deleteBook } = bookSlice.actions;
export default bookSlice.reducer;