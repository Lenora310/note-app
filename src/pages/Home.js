import React, { Fragment, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import { BookList } from "../components/books/BookList";

import { Loader } from "../components/Loader";
import { FirebaseContext } from "../context/firebase/firebaseContext";
import { Link } from "react-router-dom";

export const Home = () => {
  const { loading, books, fetchBooks, user, users} = useContext(FirebaseContext);

  // useEffect(() => {
  //   console.log("HOME user=", user);
  //   fetchBooks();
  //   console.log("HOME users=",users )
  //   console.log("HOME users[userUid]=",users[user.uid] )
  //   // eslint-disable-next-line
  // }, []);
  
  return (
    // <div onClick={handler}>
    <Fragment>

      <h3>Your books</h3>
  
      {loading ? <Loader /> : <BookList/>}

      <Link to={{ pathname: `/book_creator` }}>
        <Button>Create new book</Button>
      </Link>
    </Fragment>
    // </div>
  );
};
