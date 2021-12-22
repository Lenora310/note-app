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
  ADD_USER,
  FETCH_USERS
} from "../types";

const url = process.env.REACT_APP_DB_URL;

export const FirebaseState = ({ children }) => {
  const initialState = {
    users: {},
    books: [],
    templates: [],
    curentUser: null,
    loading: false,
  };
  const [state, dispatch] = useReducer(firebaseReducer, initialState);

  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const setUser = (user) => dispatch({ type: SET_USER, payload: { user } });

  // const addUser = async (newUser)=> {
  //   const newUserUid ={
  //     uid: newUser.uid
  //   }
  //   try {
  //     const res = await axios.post(`${url}/users.json`, newUserUid);
  //     console.log("addUser", res.data);
  //     const payload = {
  //       uid: newUserUid.uid,
  //       id: res.data.name,
  //     };
  //     dispatch({
  //       type: ADD_USER,
  //       payload,
  //     });
  //   } catch (e) {
  //     throw new Error(e.message);
  //   }

  // }


  const removeNote = async (id) => {
    await axios.delete(`${url}/notes/${id}.json`);
    dispatch({
      type: REMOVE_NOTE,
      payload: id,
    });
  };


  const fetchTemplates = async () => {
    showLoader();
    const res = await axios.get(`${url}/users/${state.curentUser.uid}/templates.json`);

    const newTemplates =[];
    Object.keys(res.data).forEach((id) => (newTemplates[id] = res.data[id]));
      const payload ={
        userUid:state.curentUser.uid,
        templates: newTemplates,
      }

    // const payload = Object.keys(res.data).map((key) => {
    //   return {
    //     ...res.data[key],
    //     id: key,
    //   };
    // });

    dispatch({
      type: FETCH_TEMPLATES,
      payload,
    });
  };

  const addTemplate = async (userUid, templateTitle, elements) => {
    const template = {
      title: templateTitle,
      elements,
    };
    try {
      const res = await axios.post(`${url}/users/${userUid}/templates.json`, template);
      console.log("addTemplate", res.data);
      const payload = {
        template,
        templateId: res.data.name,
        userUid
      };

      dispatch({
        type: ADD_TEMPLATE,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const addPageValue = async (userUid, bookId, pageId, elementId, elementValue) => {
    const res = await axios.get(
      `${url}/users/${userUid}/books/${bookId}/pages/${pageId}/values.json`
    );
    const newValues = res.data;
    newValues[elementId] = elementValue;

    try {
      const res = await axios.put(
        `${url}/users/${userUid}/books/${bookId}/pages/${pageId}/values.json`,
        newValues
      );
      console.log("addPageValue", res.data);
      const payload = {
        userUid,
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

  const addBookPage = async (userUid,bookId) => {
    const page = {
      values:{elementId:"value"}
    };
    try {
      const pageRes = await axios.post(
        `${url}/users/${userUid}/books/${bookId}/pages.json`,
        page
      );
      console.log("addPage", pageRes.data);

      const payload = {
        userUid,
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

  const addBook = async (userUid, title, template) => {
    const book = {
      title,
      date: new Date().toJSON(),
      template,
    };

    try {
      const res = await axios.post(`${url}/users/${userUid}/books.json`, book);
      console.log("addBook", res.data);
      const payload = {
        userUid,
        book,
        bookId: res.data.name,
      };
      dispatch({
        type: ADD_BOOK,
        payload,
      });
      addBookPage(userUid, res.data.name);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const fetchBooks = async () => {
    showLoader();
    const res = await axios.get(`${url}/users/${state.curentUser.uid}/books.json`);

    if (res.data) {
      const newBooks = [];
      Object.keys(res.data).forEach((id) => (newBooks[id] = res.data[id]));
      const payload ={
        userUid:state.curentUser.uid,
        books: newBooks,
      }
      console.log("FB_STATE fetchBooks payload", payload);
      dispatch({
        type: FETCH_BOOKS,
        payload,
      });
    }
    console.log("fb_state in FETCH_BOOKS state POSLE", state);
  };


  const fetchUsers = async () => {
    console.log("FB_STATE in fetchUsers state DO", state);
    const res = await axios.get(`${url}/users.json`);
    console.log("FB_STATE fetchUsers res", res);

    if (res.data) {
      const newUsers = [];
      Object.keys(res.data).forEach((id) => (newUsers[id] = res.data[id]));
      const payload ={
        users: newUsers,
      }
      console.log("FB_STATE fetchUsers payload", payload);
      dispatch({
        type: FETCH_USERS,
        payload,
      });

      
    }
    console.log("FB_STATE in fetchUsers state POSLE", state);

    console.log("FB_STATE fetchUsers users", state.users);

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
        // addUser,
        user: state.curentUser,
        users: state.users,
        fetchUsers,

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
