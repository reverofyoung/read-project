import { createSlice } from '@reduxjs/toolkit';

export const bookSlice = createSlice({
    name: "book", // 리듀서 이름
    initialState: { // 데이터의 초기값
        books: [],
        selectedBook: null,
    }, 
    reducers: { // 상태가 변하면 어떻게 실행될지
        addBook: (state, action) => {
            const newBook = action.payload;
            state.books.push({
                authors: newBook.authors,
                isbn: newBook.isbn,
                thumbnail: newBook.thumbnail,
                title: newBook.title,
                readingStatus : newBook.readingStatus,
            });
        },

        deleteBook: (state, action) => {
            const isbn = action.payload;
            state.books = state.books.filter((book) => book.isbn !== isbn);
        },

        setSelectedBook: (state, action) => {
            state.selectedBook = action.payload;
        },

        addReport: (state, action) => {
            const { isbn, newReportData }= action.payload;
            const book = state.books.find((thisBook) => thisBook.isbn === isbn);
            if(book) {
                book.content = newReportData.content;
                book.date = newReportData.date;
            }
        }
    },
});

export const { addBook, deleteBook, setSelectedBook, addReport } = bookSlice.actions;
export default bookSlice.reducer;