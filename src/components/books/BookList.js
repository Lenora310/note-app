import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AlertContext } from "../../context/alert/alertContext";
import { FirebaseContext } from "../../context/firebase/firebaseContext";

export const BookList = () => {
  const { books, removeBook, fetchBooks } = useContext(FirebaseContext);
  const alert = useContext(AlertContext);

  const deleteBook = (event, bookId) => {
    event.preventDefault();
    event.stopPropagation();
    removeBook(bookId)
      .then(() => {
        alert.show("Book was deleted", "success");
      })
      .catch((e) => {
        alert.show(`Something went wrong: ${e}`, "danger");
      });
    // console.log(books)
    // fetchBooks();
  };

  // useEffect(() => {
  //   fetchBooks();
  //   // eslint-disable-next-line
  // });

  return (
    <div className="book-list">
      <ul>
        {Object.keys(books).map((id) => {
          return (
            <li className="list-group-item book" key={id}>
              <Link to={{ pathname: `/books/${id}` }} >
                <div>
                  <strong>{books[id].title}</strong>
                  <button
                    type="button"
                    className="btn btn-close"
                    aria-label="Close"
                    onClick={(event) => {
                      // event.stopPropagation();
                      // event.preventDefault();
                      deleteBook(event, id);
                    }}
                  ></button>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
