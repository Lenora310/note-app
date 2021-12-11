import React, { Fragment, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import { BookList } from "../components/books/BookList";
import { BookForm } from "../components/form/BookForm";
import { Loader } from "../components/Loader";
import { FirebaseContext } from "../context/firebase/firebaseContext";
import { Link } from "react-router-dom";

export const Home = () => {
  const { loading, books, fetchBooks } = useContext(FirebaseContext);

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line
  }, []);
  
  return (
    // <div onClick={handler}>
    <Fragment>

      <h3>Your books</h3>
  
      {/* {loading ? (
          <Loader />
        ) : (
          <Notes notes={notes} onRemove={removeNote}></Notes>
        )}
        
        <hr /> */}

      {loading ? <Loader /> : <BookList books={books} />}
      <Link to={{ pathname: `/book_creator` }}>
        <Button>Create new book</Button>
      </Link>
    </Fragment>
    // </div>
  );
};
