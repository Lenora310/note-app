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
  ADD_PAGE_VALUE,
  SET_USER,
} from "../types";

const url = process.env.REACT_APP_DB_URL;

export const FirebaseState = ({ children }) => {
  const initialState = {
    books: [],
    templates: [],
    curentUser: null,
    loading: false,
  };
  const [state, dispatch] = useReducer(firebaseReducer, initialState);

  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const setUser = (user) => dispatch({ type: SET_USER, payload: { user } });

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

  const addPageValue = async (bookId, pageId, elementId, elementValue) => {
    const res = await axios.get(
      `${url}/books/${bookId}/pages/${pageId}/values.json`
    );
    const newValues = res.data;
    newValues[elementId] = elementValue;

    try {
      const res = await axios.put(
        `${url}/books/${bookId}/pages/${pageId}/values.json`,
        newValues
      );
      console.log("addPageValue", res.data);
      const payload = {
        bookId,
        pageId,
        newValues,
      };

      dispatch({
        type: ADD_PAGE_VALUE,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const addBookPage = async (bookId) => {
    const page = {
      // values:{inputId:"notInputActually"}
      values: { inputId: "Meme bebe" },
    };
    try {
      const pageRes = await axios.post(
        `${url}/books/${bookId}/pages.json`,
        page
      );
      console.log("addPage", pageRes.data);

      const payload = {
        pageId: pageRes.data.name,
        page,
        bookId,
      };

      dispatch({
        type: ADD_BOOK_PAGE,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const addBook = async (title, template) => {
    const book = {
      title,
      date: new Date().toJSON(),
      template,
    };

    try {
      const res = await axios.post(`${url}/books.json`, book);
      console.log("addBook", res.data);
      const payload = {
        book,
        id: res.data.name,
      };
      dispatch({
        type: ADD_BOOK,
        payload,
      });
      addBookPage(res.data.name);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const fetchBooks = async () => {
    showLoader();
    const res = await axios.get(`${url}/books.json`);

    if (res.data) {
      const payload = [];
      Object.keys(res.data).forEach((id) => (payload[id] = res.data[id]));
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

        setUser,
        user: state.user,

        addBook,
        fetchBooks,
        removeBook,
        books: state.books,
        addBookPage,
        addPageValue,

        addTemplate,
        fetchTemplates,
        templates: state.templates,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
