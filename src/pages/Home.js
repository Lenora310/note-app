import React, { Fragment, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import { BookList } from "../components/books/BookList";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import { Loader } from "../components/Loader";
import { FirebaseContext } from "../context/firebase/firebaseContext";
import { Link } from "react-router-dom";

export const Home = () => {
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
      <h3>Your books</h3>

      {loading ? <Loader /> : <BookList />}

      <Link to={{ pathname: `/book_creator` }}>
        <Button>Create new book</Button>
      </Link>
    </Fragment>
    // </div>
  );
};
