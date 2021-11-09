import React from "react";
import { Link } from "react-router-dom";

export const BookList = ({ books }) => {
  return (
    <div>
      <ul>
        {books.map((book) => (
          <Link to={{pathname:`/books/${book.id}`}} >
            <li className="list-group-item book" key={book.id}>
              <div>
                <strong>{book.title}</strong>
                &nbsp;&nbsp;
                <small>{book.id}</small>
                &nbsp;&nbsp;
                <small>{book.pages}</small>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};