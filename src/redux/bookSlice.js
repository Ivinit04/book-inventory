import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "books",
  initialState: [],
  reducers: {
    setBooks: (state, action) => action.payload,
    addBook: (state, action) => [...state, action.payload],
    updateBook: (state, action) =>
      state.map((book) => (book.id === action.payload.id ? action.payload : book)),
    deleteBook: (state, action) =>
      state.filter((book) => book.id !== action.payload),
  },
});

export const { setBooks, addBook, updateBook, deleteBook } = bookSlice.actions;

export default bookSlice.reducer;
