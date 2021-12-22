import React, { useState, useContext, useEffect } from "react";
import { Page } from "./Page";
import { FirebaseContext } from "../../context/firebase/firebaseContext";
import { Button } from "react-bootstrap";

export const Book = (props) => {
  const firebase = useContext(FirebaseContext);
  const { addBookPage, user } = useContext(FirebaseContext);

  const [id] = useState(props.match.params.id);
  const [title] = useState(firebase.books[id].title);

  const [pages, setPages] = useState(Object.keys(firebase.books[id].pages));

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
    addBookPage(user.uid, id).then(() => {
      setPages(Object.keys(firebase.books[id].pages));
    });
  };

  useEffect(() => {
    setCurrentPage(pages.length - 1);
  }, [pages.length]);

  return (
    <div>
      <h1>{title}</h1>

      <br />
      <Button onClick={previousPage}>Previous</Button>
      <br />
      <br />

      <Page bookId={id} pageId={pages[currentPage]} />
      <p>Page number: {currentPage}</p>

      <br />
      <br />
      <Button onClick={nextPage}>Next</Button>
      <br />
      <br />
      <Button onClick={addPage}>Add new page</Button>
    </div>
  );
};
