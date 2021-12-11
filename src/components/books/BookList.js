import React from "react";
import { Link } from "react-router-dom";

export const BookList = ({ books }) => {
  return (
    <div>
      <ul>
        {Object.keys(books).map((id) => {
          return (
            <Link to={{ pathname: `/books/${id}` }} key={id}>
              <li className="list-group-item book" >
                <div>
                  <strong>{books[id].title}</strong>
                  &nbsp;&nbsp;
                  {/* {console.log(book.title, " ",book.id)}
                <small>{book.id}</small>
                &nbsp;&nbsp; */}
                  {/* {book.pages.map(page => (<small>{page.title} &nbsp;</small>))} */}
                  {/* <small>{book.pages.title}</small> */}
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
