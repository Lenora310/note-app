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
  SET_USER,
  ADD_USER,
  FETCH_USERS,
} from "../types";

const handlers = {
  [SHOW_LOADER]: (state) => ({ ...state, loading: true }),
  
  [SET_USER]: (state, {payload}) => ({ ...state, curentUser: payload.user }),

  // [ADD_USER]: (state, { payload }) =>{
  //   const newUsers = state.users;
  //   newUsers[payload.id]=payload.uid;
  //   return {
  //     ...state,
  //     users: newUsers
  //   }
  // },


  [REMOVE_NOTE]: (state, { payload }) => ({
    ...state,
    notes: state.notes.filter((note) => note.id !== payload),
  }),

  // [REMOVE_BOOK]: (state, { payload }) => ({
  //   ...state,
  //   books: state.books.filter((book) => book.id !== payload),
  // }),

  [ADD_BOOK]: (state, { payload }) =>{
    const newUsers=state.users;
    newUsers[payload.userUid].books[payload.bookId]=payload.book;

    // const newBooks = state.books;
    // newBooks[payload.id]=payload.book;
    return {
      ...state,
      users: newUsers
    }
  },
  
  [FETCH_BOOKS]: (state, { payload }) => {
    const newUsers=state.users;

    newUsers[payload.userUid]={
      ...newUsers[payload.userUid],
      books:payload.books
    };
    // newUsers[payload.userUid].books=payload.books;

    // if(!newUsers[payload.userUid].books){
    //   newUsers[payload.userUid].books=[];
    // }
    // newUsers[payload.userUid].books=payload.books;
    // newUsers[payload.userUid]['books']=payload.books;
    return {
      ...state,
      users: newUsers,
      loading: false,
    }
  },

  [FETCH_USERS]: (state, { payload }) =>{
    console.log("FB_REDUCER payload=",payload)
    const newUsers=payload['users'];
    console.log("FB_REDUCER newUsers=",newUsers)
    return {
      ...state,
      users: newUsers,
    }

  },
  //  ({
  //     ...state,
  //     users: ...payload.users,
  //   }),
  
  
  // {
  //   const newUsers=state.users;

  //   newUsers[payload.userUid]={
  //     ...newUsers[payload.userUid],
  //     books:payload.books
  //   };
  //   // newUsers[payload.userUid].books=payload.books;

  //   // if(!newUsers[payload.userUid].books){
  //   //   newUsers[payload.userUid].books=[];
  //   // }
  //   // newUsers[payload.userUid].books=payload.books;
  //   // newUsers[payload.userUid]['books']=payload.books;
  //   return {
  //     ...state,
  //     users: newUsers,
  //     loading: false,
  //   }
  // },

  [ADD_BOOK_PAGE]: (state, { payload }) => {
    const newUsers=state.users;
    if(!newUsers[payload.userUid].books[payload.bookId].pages){
      newUsers[payload.userUid].books[payload.bookId].pages=[];
    }
    newUsers[payload.userUid].books[payload.bookId].pages[payload.pageId]=payload.page;

    // const newBooks = state.books;
    // if(!newBooks[payload.bookId].pages){
    //   newBooks[payload.bookId].pages=[];
    // }
    // newBooks[payload.bookId].pages[payload.pageId]=payload.page;
    return {
      ...state,
      users: newUsers,
    };
  },

  [ADD_PAGE_VALUE]: (state, {payload}) =>{
    const newUsers=state.users;
    newUsers[payload.userUid].books[payload.bookId].pages[payload.pageId].values=payload.newValues;

    // const newBooks = state.books;
    // newBooks[payload.bookId].pages[payload.pageId].values=payload.newValues;
    return {
      ...state,
      users: newUsers,
    };
  },



  [ADD_TEMPLATE]: (state, { payload }) => {
    const newUsers=state.users;
    newUsers[payload.userUid].templates[payload.templateId]=payload.template;

    // const newBooks = state.books;
    // newBooks[payload.id]=payload.book;
    return {
      ...state,
      users: newUsers
    }
  },
  
  // ({
  //   ...state,
  //   templates: [...state.templates, payload],
  // }),
  [FETCH_TEMPLATES]: (state, { payload }) => {
    const newUsers=state.users;
    newUsers[payload.userUid].templates=payload.templates;
    return {
      ...state,
      users: newUsers,
      loading: false,
    }
  },
  
  
  // ({
  //   ...state,
  //   templates: payload,
  //   loading: false,
  // }),

  DEFAULT: (state) => state,
};

export const firebaseReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
