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
                {/* {console.log(book.title, " ",book.id)}
                <small>{book.id}</small>
                &nbsp;&nbsp; */}
                {/* {book.pages.map(page => (<small>{page.title} &nbsp;</small>))} */}

                {/* <small>{book.pages.title}</small> */}
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};