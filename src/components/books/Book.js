import React, { useState, useContext, useEffect } from "react";
import { Page } from "./Page";
import { FirebaseContext } from "../../context/firebase/firebaseContext";
import { Button } from "react-bootstrap";
import { auth } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export const Book = (props) => {
  const {books, setUser} = useContext(FirebaseContext);
  const { addBookPage } = useContext(FirebaseContext);

  const [id] = useState(props.match.params.id);
  // const [title] = useState(books[id].title);

  const [pages, setPages] = useState(Object.keys(books[id].pages));

  const [currentPage, setCurrentPage] = useState(0);

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  const addPage = () => {
    addBookPage(id).then(() => {
      setPages(Object.keys(books[id].pages));
    });
  };

  useEffect(() => {
    setCurrentPage(pages.length - 1);
  }, [pages.length]);

  // useEffect(() => {
  //   onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //   });
  //   setPages(Object.keys(books[id].pages));
  //   // eslint-disable-next-line
  // }, []);

  return (
    <div>
      <h1>{books[id].title}</h1>

    
      <Page bookId={id} pageId={pages[currentPage]} />
      <p>Page number: {currentPage}</p>

      <button type="button" className="btn btn-secondary" onClick={previousPage}>Previous</button>
      <button type="button" className="btn btn-secondary" onClick={nextPage}>Next</button>

      <Button onClick={addPage}>Add new page</Button>
    </div>
  );
};
