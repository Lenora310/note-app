import {
  SHOW_LOADER,
  ADD_NOTE,
  FETCH_NOTES,
  REMOVE_NOTE,
  ADD_BOOK,
  FETCH_BOOKS,
  ADD_BOOK_PAGE,
  ADD_TEMPLATE,
  FETCH_TEMPLATES,
} from "../types";

const handlers = {
  [SHOW_LOADER]: (state) => ({ ...state, loading: true }),


  [REMOVE_NOTE]: (state, { payload }) => ({
    ...state,
    notes: state.notes.filter((note) => note.id !== payload),
  }),

  // [ADD_BOOK]: (state, { payload }) => ({
  //   ...state,
  //   books: [...state.books, payload],
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
    console.log("newBooks=", newBooks)
    // newBooks[payload.bookId].pages.push(payload.page);
    if(!newBooks.find(el => el.id===payload.bookId).pages){
      newBooks.find(el => el.id===payload.bookId).pages=[];
    }
    newBooks.find(el => el.id===payload.bookId).pages[payload.pageId]=payload.page;
    // newBooks.find(el => el.id===payload.bookId).pages=[{payload.pageId:payload.page}];

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
