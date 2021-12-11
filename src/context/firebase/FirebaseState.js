import React, { useReducer } from "react";
import axios from "axios";
import { FirebaseContext } from "./firebaseContext";
import { firebaseReducer } from "./firebaseReducer";
import {
  SHOW_LOADER,
  REMOVE_NOTE,
  ADD_BOOK,
  FETCH_BOOKS,
  REMOVE_BOOK,
  ADD_BOOK_PAGE,
  ADD_TEMPLATE,
  FETCH_TEMPLATES,
} from "../types";

const url = process.env.REACT_APP_DB_URL;

export const FirebaseState = ({ children }) => {
  const initialState = {
    books: [], //new Map(),
    templates: [],
    
    loading: false,
  };
  const [state, dispatch] = useReducer(firebaseReducer, initialState);

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const removeNote = async (id) => {
    await axios.delete(`${url}/notes/${id}.json`);
    dispatch({
      type: REMOVE_NOTE,
      payload: id,
    });
  };

  const fetchTemplates = async () => {
    showLoader();
    const res = await axios.get(`${url}/templates.json`);

    const payload = Object.keys(res.data).map((key) => {
      return {
        ...res.data[key],
        id: key,
      };
    });

    dispatch({
      type: FETCH_TEMPLATES,
      payload,
    });
  };

  const addTemplate = async (templateTitle, elements) => {
    const template = {
      title: templateTitle,
      elements,
    };
    try {
      const res = await axios.post(`${url}/templates.json`, template);
      console.log("addTemplate", res.data);
      const payload = {
        ...template,
        id: res.data.name,
      };

      dispatch({
        type: ADD_TEMPLATE,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const addPageValue = (bookId, pageNumber, elementId, value) => {
    
  };

  const addBookPage = async (bookId) => {

    const page = {
      // values:{inputId:"notInputActually"}
      values:{inputId:"Meme bebe"}
    };
    try {
      const pageRes = await axios.post(`${url}/books/${bookId}/pages.json`, page);
      console.log("addPage", pageRes);
      // const pagesRes = await axios.get(`${url}/books/${bookId}/pages.json`);
      // console.log("pagesRes", pagesRes);
      
      const payload = {
        pageId: pageRes.data.name,
        page,
        bookId
      };
      console.log("payload", payload);
      console.log("books do dispatch=", state.books);
      
      dispatch({
        type: ADD_BOOK_PAGE,
        payload,
      });
      console.log("books PO dispatch=", state.books);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  

  const addBook = async (title, template) => {
    const book = {
      title,
      date: new Date().toJSON(),
      // pages: [{values:[]}],
      // pages: [],
      template
    };

    try {
      const res = await axios.post(`${url}/books.json`, book);
      console.log("addBook", res.data);
      const payload = {
        // ...book,
        book,
        id: res.data.name,
      };
      dispatch({
        type: ADD_BOOK,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const fetchBooks = async () => {
    showLoader();
    const res = await axios.get(`${url}/books.json`);
    console.log(res);

    if (res.data) {
      const payload = Object.keys(res.data).map((key) => {
        return {
          ...res.data[key],
          id: key,
        };
      });

      dispatch({
        type: FETCH_BOOKS,
        payload,
      });
    }
  };

  const removeBook = async (id) => {
    await axios.delete(`${url}/books/${id}.json`);
    dispatch({
      type: REMOVE_BOOK,
      payload: id,
    });
  };

  
  return (
    <FirebaseContext.Provider
      value={{
        showLoader,
        loading: state.loading,

        addBook,
        fetchBooks,
        removeBook,
        books: state.books,
        addBookPage,

        addTemplate,
        fetchTemplates,
        templates: state.templates,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
