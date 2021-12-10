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
  [ADD_NOTE]: (state, { payload }) => ({
    ...state,
    notes: [...state.notes, payload],
  }),
  [FETCH_NOTES]: (state, { payload }) => ({
    ...state,
    notes: payload,
    loading: false,
  }),

  [REMOVE_NOTE]: (state, { payload }) => ({
    ...state,
    notes: state.notes.filter((note) => note.id !== payload),
  }),

  [ADD_BOOK]: (state, { payload }) => ({
    ...state,
    books: [...state.books, payload],
  }),
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

  // (
  //   if(true){

  //   }
  //   return {
  //   ...state,
  //   books[id]:{},
  //   // books: state.books.find(book => book.id !== payload.bookId).pages.push(payload.values),
  //   books: state.books.map((book) => {
  //     if(book.id === payload.bookId){
  //       book.pages=payload.pages;
  //     }
  //     return book;
  //   })
  //   // state.books[payload.bookId]:[...state.books[payload.bookId], payload.page]
  // }),

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
