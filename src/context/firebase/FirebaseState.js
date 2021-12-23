import React, { useReducer } from "react";
import axios from "axios";
import { FirebaseContext } from "./firebaseContext";
import { firebaseReducer } from "./firebaseReducer";
import { auth } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
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
  ADD_USER,
  FETCH_USERS,
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
  const setUser = (user) =>
    dispatch({ type: SET_USER, payload: { user } });

  // const fetchUser = () => {
  //   onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //   });
  //   console.log("FETCH_USER user", state.currentUser);
  //   // if(!state.currentUser){
  //   //   console.log("FETCH_USER auth", auth);
  //   //   console.log("FETCH_USER auth.currentUser", auth.currentUser);
  //   //   setUser(auth.currentUser)
  //   //   console.log("FETCH_USER user", state.currentUser);
  //   // }
  // }

  const removeNote = async (id) => {
    await axios.delete(`${url}/notes/${id}.json`);
    dispatch({
      type: REMOVE_NOTE,
      payload: id,
    });
  };

  const fetchBooks = async () => {
    if(!state.currentUser){
      console.log("USER IS NOT DEFINED!")
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
    await axios.delete(`${url}/books/${id}.json`);
    dispatch({
      type: REMOVE_BOOK,
      payload: id,
    });
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

  const addTemplate = async (templateTitle, elements) => {
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
        showLoader,
        loading: state.loading,

        setUser,
        user: state.currentUser,
        // fetchUser,

        addBook,
        fetchBooks,
        removeBook,
        books: state.books,
        addBookPage,
        addPageValue,

        addTemplate,
        fetchTemplates,
        fetchPublicTemplates,
        templates: state.templates,
        publicTemplates: state.publicTemplates,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
