import React, {useState, useContext, useEffect } from "react";
import { Page } from "./Page";
import { FirebaseContext } from "../../context/firebase/firebaseContext";
import { PageForm } from "../form/PageForm";
import { Button } from "react-bootstrap";

export const Book = (props) => {
  const firebase = useContext(FirebaseContext);
  const { addBookPage } = useContext(FirebaseContext);

  const [id] = useState(props.match.params.id);

  const [pages, setPages] = useState(
    firebase.books.find((element) => {
      return element.id === id;
    }).pages
  );
  const [currentPage, setCurrentPage] = useState(0);

  const previousPage = () => {
    if (currentPage !== 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== Object.keys(pages).length) {
      setCurrentPage(currentPage + 1);
    }
  };
  const addPage = () => {
    addBookPage(id);

    setPages(
      firebase.books.find((element) => {
        return element.id === id;
      }).pages
    );

    // setCurrentPage(Object.keys(pages).length);
  };

  // console.log("pages DO addPage:", pages);
  // console.log("pages PO addPage:", pages);
  // console.log("pages total:", pages);
  // console.log("currentPage:", currentPage);

  // console.log("pages,length:", pages.length);
  // console.log("FB", firebase);

  // const { loading, notes, fetchNotes, removeNote, books, fetchBooks } =
  //   useContext(FirebaseContext);

  // useEffect(() => {

  //   firebase.fetchBooks();
  //   //eslint-disable-next-line
  // });

  // useEffect(() => {
  //   console.log("pages,length:", Object.keys(pages).length);
  //   setCurrentPage(Object.keys(pages).length);
  //   //eslint-disable-next-line
  // }, firebase.books);

  // useEffect(() => {
  //   fetchNotes();
  //   fetchBooks();
  //   //eslint-disable-next-line
  // }, []);

  return (
    <div>
      <h1>I am a book with id {id} </h1>

      <br />
      <Button onClick={previousPage}>Previous</Button>
      <br />
      <br />

      <Page pageNumber={currentPage} bookId={id} />

      <br />
      <br />
      <Button onClick={nextPage}>Next</Button>
      <br />
      <br />
      <Button onClick={addPage}>Add new page</Button>
    </div>
  );
};