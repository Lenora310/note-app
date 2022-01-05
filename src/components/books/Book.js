import React, { useState, useContext, useEffect } from "react";
import { Page } from "./Page";
import { FirebaseContext } from "../../context/firebase/firebaseContext";
import { Link } from "react-router-dom";

export const Book = (props) => {
  const { books, setUser } = useContext(FirebaseContext);
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
    <div className="book">
      <Link to={{ pathname: `/books` }}>
        <button type="button" className="btn btn-secondary back">
          Back to your books
        </button>
      </Link>
      <h1>{books[id].title}</h1>

      <span className="book-page-content">
        <Page bookId={id} pageId={pages[currentPage]} />
        <p>Page number: {currentPage}</p>

        <div className="btn-group">
          <button
            type="button"
            className="btn btn-outline-primary btn-block"
            onClick={previousPage}
          >
            Previous
          </button>
          <button
            type="button"
            className="btn btn-outline-primary btn-block"
            onClick={nextPage}
          >
            Next
          </button>
        </div>
      </span>

      <button type="button" className="btn btn-primary add-page" onClick={addPage}>
        Add new page
      </button>
    </div>
  );
};
