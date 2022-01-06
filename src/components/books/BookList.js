import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
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
        fetchBooks();
      })
      .catch((e) => {
        console.log(e);
        alert.show(`Something went wrong: ${e.message}`, "danger");
      }); 
  };

  return (
    <div className="book-list">
      <Container fluid className="list-group" role="tablist">
        {Object.keys(books).map((id) => {
          return (
            <Row
              className="list-group-item list-group-item-action book"
              key={id}
              role="tab"
              data-bs-toggle="list"
            >
            
              
                <Link className="book-link" to={{ pathname: `/books/${id}` }}>
                  <strong>{books[id].title}</strong>
                  <button
                  type="button"
                  className="btn btn-close"
                  aria-label="Close"
                  onClick={(event) => {
                    deleteBook(event, id);
                  }}
                ></button>
                </Link>
                
            
            </Row>
          );
        })}
      </Container>
    </div>
  );
};
