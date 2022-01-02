import {
  SHOW_LOADER, 
  CLOSE_LOADER, 
  SET_USER,
  ADD_BOOK,
  FETCH_BOOKS, 
  REMOVE_BOOK,
  ADD_BOOK_PAGE,
  ADD_PAGE_VALUE,
  ADD_TEMPLATE,
  FETCH_TEMPLATES,
  FETCH_PUBLIC_TEMPLATES,
} from "../types";

const handlers = {
  [SHOW_LOADER]: (state) => ({ ...state, loading: true }),
  [CLOSE_LOADER]: (state) => ({ ...state, loading: false }),

  [SET_USER]: (state, { payload }) => ({ ...state, currentUser: payload.user }),

  // [REMOVE_NOTE]: (state, { payload }) => ({
  //   ...state,
  //   notes: state.notes.filter((note) => note.id !== payload),
  // }),

  // [REMOVE_BOOK]: (state, { payload }) => ({
  //   ...state,
  //   books: state.books.filter((book) => book.id !== payload),
  // }),

  [ADD_BOOK]: (state, { payload }) => {
    const newBooks = state.books;
    newBooks[payload.bookId] = payload.book;
    return {
      ...state,
      books: newBooks,
    };
  },

  [FETCH_BOOKS]: (state, { payload }) => ({
    ...state,
    books: payload.books,
    loading: false,
  }),

  [ADD_BOOK_PAGE]: (state, { payload }) => {
    const newBooks = state.books;
    console.log("[ADD_BOOK_PAGE] newBooks", newBooks);
    if (!newBooks[payload.bookId].pages) {
      newBooks[payload.bookId].pages = [];
    }
    newBooks[payload.bookId].pages[payload.pageId] = payload.page;
    return {
      ...state,
      books: newBooks,
    };
  },

  [ADD_PAGE_VALUE]: (state, { payload }) => {
    const newBooks = state.books;
    newBooks[payload.bookId].pages[payload.pageId].values = payload.newValues;
    return {
      ...state,
      books: newBooks,
    };
  },

  [ADD_TEMPLATE]: (state, { payload }) => {
    const newTemplates = state.templates;
    newTemplates[payload.templateId] = payload.template;
    return {
      ...state,
      templates: newTemplates,
    };
  },

  [FETCH_TEMPLATES]: (state, { payload }) => ({
    ...state,
    templates: payload.templates,
    loading: false,
  }),

  [FETCH_PUBLIC_TEMPLATES]: (state, { payload }) => ({
    ...state,
    publicTemplates: payload.templates,
  }),

  DEFAULT: (state) => state,
};

export const firebaseReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
