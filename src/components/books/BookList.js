import React from "react";
import { Link } from "react-router-dom";

export const BookList = () => {
  const {books} = useContext(FirebaseContext);

  
  return (
    <div> 
      <ul>
        {Object.keys(books).map((id) => {
          return (
            <Link to={{ pathname: `/books/${id}` }} key={id}>
              <li className="list-group-item book" >
                <div>
                  <strong>{books[id].title}</strong>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
