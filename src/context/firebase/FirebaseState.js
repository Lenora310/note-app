import React, { useReducer } from "react";
import axios from "axios";
import { FirebaseContext } from "./firebaseContext";
import { firebaseReducer } from "./firebaseReducer";
import {
  SHOW_LOADER,
  ADD_BOOK,
  FETCH_BOOKS,
  REMOVE_BOOK,
  ADD_BOOK_PAGE,
  ADD_TEMPLATE,
  FETCH_TEMPLATES,
  ADD_PAGE_VALUE,
  SET_USER,
  FETCH_PUBLIC_TEMPLATES,
  CLOSE_LOADER,
} from "../types";

const url = process.env.REACT_APP_DB_URL;

export const FirebaseState = ({ children }) => {
  const initialState = {
    currentUser: null,

    books: [],
    templates: [],

    publicTemplates: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(firebaseReducer, initialState);

  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const closeLoader = () => dispatch({ type: CLOSE_LOADER });
  const setUser = (user) => dispatch({ type: SET_USER, payload: { user } });

  // const removeNote = async (id) => {
  //   await axios.delete(`${url}/notes/${id}.json`);
  //   dispatch({
  //     type: REMOVE_NOTE,
  //     payload: id,
  //   });
  // };

  const fetchBooks = async () => {
    if (!state.currentUser) {
      console.log("USER IS NOT DEFINED!");
      return;
    }
    showLoader();
    const res = await axios.get(
      `${url}/users/${state.currentUser.uid}/books.json`
    );

    if (res.data) {
      const newBooks = [];
      Object.keys(res.data).forEach((id) => (newBooks[id] = res.data[id]));
      const payload = {
        books: newBooks,
      };
      dispatch({
        type: FETCH_BOOKS,
        payload,
      });
    } else {
      closeLoader();
    }
  };

  const addBook = async (title, template) => {
    const book = {
      title,
      date: new Date().toJSON(),
      template,
    };
    try {
      const res = await axios.post(
        `${url}/users/${state.currentUser.uid}/books.json`,
        book
      );
      console.log("addBook", res.data);
      const payload = {
        book,
        bookId: res.data.name,
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

  const removeBook = async (id) => {
    try {
       await axios.delete(`${url}/users/${state.currentUser.uid}/books/${id}.json`);
    dispatch({
      type: REMOVE_BOOK,
      payload: id,
    });
    } catch (e) {
      throw new Error(e.message);
    }
   
  };

  const fetchTemplates = async () => {
    showLoader();
    const res = await axios.get(
      `${url}/users/${state.currentUser.uid}/templates.json`
    );
    if (res.data) {
      const newTemplates = [];
      Object.keys(res.data).forEach((id) => (newTemplates[id] = res.data[id]));
      const payload = {
        templates: newTemplates,
      };
      dispatch({
        type: FETCH_TEMPLATES,
        payload,
      });
    }
  };

  const fetchPublicTemplates = async () => {
    const res = await axios.get(`${url}/templates.json`);

    if (res.data) {
      const newTemplates = [];
      Object.keys(res.data).forEach((id) => (newTemplates[id] = res.data[id]));
      const payload = {
        templates: newTemplates,
      };
      console.log("fetch templates payload=", payload);
      dispatch({
        type: FETCH_PUBLIC_TEMPLATES,
        payload,
      });
    }
  };

  const addTemplate = async (templateTitle, elements, publish) => {
    const template = {
      title: templateTitle,
      elements,
    };

    try {
      const res = await axios.post(
        `${url}/users/${state.currentUser.uid}/templates.json`,
        template
      );
      console.log("addTemplate", res.data);
      const payload = {
        template,
        templateId: res.data.name,
      };

      dispatch({
        type: ADD_TEMPLATE,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }

    if (publish) {
      publishTemplate(templateTitle, elements);
    }
  };

  const publishTemplate = async (templateTitle, elements) => {
    const template = {
      title: templateTitle,
      elements,
    };
    try {
      const res = await axios.post(`${url}/templates.json`, template);
      console.log("publishTemplate", res.data);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const downloadPublicTemplate = async (templateId) => {
    const res = await axios.get(`${url}/templates/${templateId}.json`);
    console.log("downloadPublicTemplate", res.data);
    addTemplate(res.data.title, res.data.elements);
  };

  const addBookPage = async (bookId) => {
    const page = {
      values: { elementId: "value" },
    };
    try {
      const pageRes = await axios.post(
        `${url}/users/${state.currentUser.uid}/books/${bookId}/pages.json`,
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

  const addPageValue = async (bookId, pageId, elementId, elementValue) => {
    const res = await axios.get(
      `${url}/users/${state.currentUser.uid}/books/${bookId}/pages/${pageId}/values.json`
    );
    const newValues = res.data;
    newValues[elementId] = elementValue;

    try {
      const res = await axios.put(
        `${url}/users/${state.currentUser.uid}/books/${bookId}/pages/${pageId}/values.json`,
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

  return (
    <FirebaseContext.Provider
      value={{
        loading: state.loading,

        user: state.currentUser,
        setUser,

        books: state.books,
        addBook,
        fetchBooks,
        removeBook,

        addBookPage,
        addPageValue,

        templates: state.templates,
        publicTemplates: state.publicTemplates,
        addTemplate,
        fetchTemplates,
        fetchPublicTemplates,
        downloadPublicTemplate,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
