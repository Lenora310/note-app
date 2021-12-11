import {
  SHOW_LOADER,
  REMOVE_NOTE,
  ADD_BOOK,
  FETCH_BOOKS,
  ADD_BOOK_PAGE,
  ADD_PAGE_VALUE,
  ADD_TEMPLATE,
  FETCH_TEMPLATES,
  REMOVE_BOOK,
} from "../types";

const handlers = {
  [SHOW_LOADER]: (state) => ({ ...state, loading: true }),


  [REMOVE_NOTE]: (state, { payload }) => ({
    ...state,
    notes: state.notes.filter((note) => note.id !== payload),
  }),

  // [REMOVE_BOOK]: (state, { payload }) => ({
  //   ...state,
  //   books: state.books.filter((book) => book.id !== payload),
  // }),

  [ADD_BOOK]: (state, { payload }) =>{
    const newBooks = state.books;
    newBooks[payload.id]=payload.book;
    return {
      ...state,
      books: newBooks
    }
  },
  
  [FETCH_BOOKS]: (state, { payload }) => ({
    ...state,
    books: payload,
    loading: false,
  }),

  [ADD_BOOK_PAGE]: (state, { payload }) => {
    const newBooks = state.books;
    if(!newBooks[payload.bookId].pages){
      newBooks[payload.bookId].pages=[];
    }
    newBooks[payload.bookId].pages[payload.pageId]=payload.page;
    return {
      ...state,
      books: newBooks,
    };
  },

  [ADD_PAGE_VALUE]: (state, {payload}) =>{
    const newBooks = state.books;
    newBooks[payload.bookId].pages[payload.pageId].values=payload.newValues;
    return {
      ...state,
      books: newBooks,
    };
  },



  [ADD_TEMPLATE]: (state, { payload }) => ({
    ...state,
    templates: [...state.templates, payload],
  }),
  [FETCH_TEMPLATES]: (state, { payload }) => ({
    ...state,
    templates: payload,
    loading: false,
  }),

  DEFAULT: (state) => state,
};

export const firebaseReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
