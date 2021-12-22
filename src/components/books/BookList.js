import React, { useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../../context/firebase/firebaseContext";

export const BookList = () => {
  const {users, user, fetchBooks} = useContext(FirebaseContext);

  useEffect(() => {
    console.log("BOOKLIST user=", user);
    fetchBooks();
    console.log("BOOKLIST users=",users )
    console.log("BOOKLIST users[userUid]=",users[user.uid] )
    // eslint-disable-next-line
  }, []);
  
  return (
    <div> 
      console.log("BOOKLIST users=",users )
      <ul>
        {Object.keys(users[user.uid].books).map((id) => {
          return (
            <Link to={{ pathname: `/books/${id}` }} key={id}>
              <li className="list-group-item book" >
                <div>
                  <strong>{users[user.uid].books[id].title}</strong>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
