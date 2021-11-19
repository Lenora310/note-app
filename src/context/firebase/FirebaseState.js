import React, { useReducer } from "react";
import axios from "axios";
import { FirebaseContext } from "./firebaseContext";
import { firebaseReducer } from "./firebaseReducer";
import {
  SHOW_LOADER,
  ADD_NOTE,
  FETCH_NOTES,
  REMOVE_NOTE,
  ADD_BOOK,
  FETCH_BOOKS,
  REMOVE_BOOK,
  ADD_PAGE,
  ADD_TEMPLATE,
  FETCH_TEMPLATES,
} from "../types";

const url = process.env.REACT_APP_DB_URL;

export const FirebaseState = ({ children }) => {
  const initialState = {
    books: [], //new Map(),
    templates: [],
    // notes: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(firebaseReducer, initialState);

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const fetchNotes = async () => {
    showLoader();
    const res = await axios.get(`${url}/notes.json`);

    const payload = Object.keys(res.data).map((key) => {
      return {
        ...res.data[key],
        id: key,
      };
    });

    dispatch({
      type: FETCH_NOTES,
      payload,
    });
  };

  const addNote = async (title) => {
    const note = {
      title,
      date: new Date().toJSON(),
    };

    try {
      const res = await axios.post(`${url}/notes.json`, note);
      console.log("addNote", res.data);
      const payload = {
        ...note,
        id: res.data.name,
      };
      dispatch({
        type: ADD_NOTE,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
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

  const addBook = async (title, template) => {
    const book = {
      title,
      date: new Date().toJSON(),
      pages: [],
      // [
      //   {
      //     id: "Mmh000",
      //     title: "Moscow",
      //     elements: "",
      //     type: "travel",
      //   },
      //   {
      //     id: "Kmn001",
      //     title: "Samara",
      //     elements: "",
      //     type: "travel",
      //   },
      // ],
      template
    };

    // console.log("ADD BOOK with book:")
    // console.log(book)
    try {
      const res = await axios.post(`${url}/books.json`, book);
      console.log("addBook", res.data);
      const payload = {
        ...book,
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

  const addPage = async (id, title) => {
    const page = {
      title,
    };

    try {
      const res = await axios.post(`${url}/books/${id}/pages.json`, page);
      console.log("addPage", res.data);
      const payload = {
        ...page,
        bookId: id,
        pageId: res.data.name,
      };
      dispatch({
        type: ADD_PAGE,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
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
        addPage,

        addTemplate,
        fetchTemplates,
        templates: state.templates,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
