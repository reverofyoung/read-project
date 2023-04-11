import { createSlice } from '@reduxjs/toolkit';

export const bookSlice = createSlice({
    name: "book", // 리듀서 이름
    initialState: { // 데이터의 초기값
        value: {
            // title: "", 
            // isbn: "", 
            // status: ""
        }
    }, 
    reducers: { // 상태가 변하면 어떻게 실행될지
        clickedBook: (state, action) => {
            state.value = action.payload
            // state -> 우리가 잡아놓은 초기값의 value를 가져오는 역할
            // actions안에 payload랑 type -> 데이터를 원하는 곳에다가 넘겨주는 역할
        },
    },
});
export const { clickedBook } = bookSlice.actions;
export default bookSlice.reducer;