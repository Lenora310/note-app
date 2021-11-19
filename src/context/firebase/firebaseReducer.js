import { SHOW_LOADER, ADD_NOTE, FETCH_NOTES, REMOVE_NOTE, ADD_BOOK, FETCH_BOOKS, ADD_PAGE, ADD_TEMPLATE, FETCH_TEMPLATES } from "../types";

const handlers = {
  [SHOW_LOADER]: (state) => ({ ...state, loading: true }),
  [ADD_NOTE]: (state, { payload }) => ({
    ...state,
    notes: [...state.notes, payload],
  }),
  [FETCH_NOTES]: (state, { payload }) => ({ ...state, notes: payload , loading: false}),
  [REMOVE_NOTE]: (state, { payload }) => ({
    ...state,
    notes: state.notes.filter(note => note.id !== payload),
  }),


  [ADD_BOOK]: (state, { payload }) => ({
    ...state,
    books: [...state.books, payload],
  }),
  [FETCH_BOOKS]: (state, { payload }) => ({ ...state, books: payload , loading: false}),

  [ADD_PAGE]: (state, {payload}) => {
    console.log(payload)
    return state;
    // return({
    //   ...state, 
    // books: 3,
    // })
  },

  [ADD_TEMPLATE]: (state, { payload }) => ({
    ...state,
    templates: [...state.templates, payload],
  }),
  [FETCH_TEMPLATES]: (state, { payload }) => ({ ...state, templates: payload , loading: false}),

  DEFAULT: (state) => state
};

export const firebaseReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
