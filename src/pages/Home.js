import React, { Fragment, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import { BookList } from "../components/books/BookList";
import { BookForm } from "../components/form/BookForm";
import { NoteForm } from "../components/form/NoteForm";
import { Loader } from "../components/Loader";
import { Notes } from "../components/Notes";
import { FirebaseContext } from "../context/firebase/firebaseContext";
import { Link } from "react-router-dom";

export const Home = () => {
  // const { loading, notes, fetchNotes, removeNote, books, fetchBooks } =
  //   useContext(FirebaseContext);
  const { loading, books, fetchBooks } = useContext(FirebaseContext);

  useEffect(() => {
    fetchBooks();
    //eslint-disable-next-line
  }, []);

  const handler = () => {
    console.log("Hello, I am note!");
  };

  

  return (
    // <div onClick={handler}>
    <Fragment>
      {/* <h3>Note form</h3>
        <NoteForm></NoteForm> */}
      <h3>Book form</h3>
      <BookForm />
      <hr />

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
