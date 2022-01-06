import React, { Fragment, useEffect, useContext } from "react";
import { BookList } from "../components/books/BookList";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import { Loader } from "../components/Loader";
import { FirebaseContext } from "../context/firebase/firebaseContext";
import { Link } from "react-router-dom";

export const Books = () => {
  const { loading, fetchBooks, setUser, user } = useContext(FirebaseContext);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line
  }, [user]);

  return (
    <Fragment>
      <h1>Your books</h1>

      {loading ? <Loader /> : <BookList />}

      <Link to={{ pathname: `/book_creator` }}>
        <button type="button" className="btn btn-primary">
          Create new book
        </button>
      </Link>
    </Fragment>
  );
};
